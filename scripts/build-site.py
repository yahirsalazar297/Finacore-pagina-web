#!/usr/bin/env python3
"""Construye _site/ con SOLO los archivos públicos de FINACORE y verifica el resultado.

Uso:  python3 scripts/build-site.py [carpeta_de_salida]      (por defecto: _site)

GitHub Pages publica únicamente el contenido de _site/. Esta es la ÚNICA lista blanca:
si se añade un archivo público nuevo, se agrega aquí y en ningún otro lugar.

Verificaciones (si alguna falla, el script termina con código 1 y el despliegue se detiene):
  1. Existen todos los archivos de la lista blanca.
  2. No falta ningún recurso local que referencien index.html, el CSS o el JS.
  3. No sobra ningún archivo ni hay enlaces simbólicos.
  4. Las rutas funcionan bajo el subdirectorio de un "project site" (/<repo>/):
     sin rutas absolutas a la raíz (href="/...") ni recursos http:// (contenido mixto).
"""
import pathlib
import re
import shutil
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent

# ── Lista blanca ────────────────────────────────────────────────────────────
FILES = [
    'index.html',
    'logo-fincore.png',
    'ods-4.png',
    'ods-8.png',
    'ods-10.png',
]
ASSETS_DIR = 'assets'                           # css, js y fuentes (con sus licencias OFL)
ASSET_EXTENSIONS = {'.css', '.js', '.woff2', '.txt'}


def fail(msg):
    print('ERROR:', msg)
    sys.exit(1)


def build(out):
    if out == ROOT or out in ROOT.parents:
        fail(f'la carpeta de salida no puede ser el repositorio ni un directorio que lo contenga: {out}')
    for f in FILES:
        if not (ROOT / f).is_file():
            fail(f'falta en el repositorio un archivo de la lista blanca: {f}')
    if out.exists():
        shutil.rmtree(out)
    out.mkdir(parents=True)
    for f in FILES:
        shutil.copy2(ROOT / f, out / f)
    src_assets = ROOT / ASSETS_DIR
    if not src_assets.is_dir():
        fail(f'falta la carpeta {ASSETS_DIR}/')
    for p in sorted(src_assets.rglob('*')):
        rel = p.relative_to(ROOT)
        if p.is_file() and not p.is_symlink() and p.suffix.lower() in ASSET_EXTENSIONS \
                and not any(part.startswith('.') for part in rel.parts):
            (out / rel).parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(p, out / rel)


def local_refs(path, patterns, root):
    text = path.read_text(encoding='utf-8')
    text = re.sub(r'<!--.*?-->', '', text, flags=re.S)       # los comentarios HTML no cuentan
    for pat in patterns:
        for m in re.finditer(pat, text):
            u = m.group(1).strip()
            if not u or re.match(r'(https?:|//|data:|mailto:|tel:|#|javascript:)', u):
                continue
            u = u.split('#')[0].split('?')[0]
            if u.startswith('/'):
                continue                       # ruta absoluta: la reporta la verificación 4
            try:
                yield u, (path.parent / u).resolve().relative_to(root.resolve()).as_posix()
            except ValueError:                 # sale de la carpeta (p. ej. ../x): nunca será publicable
                yield u, f'(fuera de {root.name}/) {u}'


def verify(out):
    problems = []
    entries = [p for p in out.rglob('*')]
    files = {p.relative_to(out).as_posix() for p in entries if p.is_file()}

    # 3. sobrantes y enlaces simbólicos
    allowed = set(FILES)
    extra = sorted(f for f in files if f not in allowed and not f.startswith(ASSETS_DIR + '/'))
    problems += [f'sobra (no está en la lista blanca): {f}' for f in extra]
    problems += [f'enlace simbólico no permitido: {p.relative_to(out)}' for p in entries if p.is_symlink()]

    # 2. faltantes
    needed = set()
    html = out / 'index.html'
    for _, rel in local_refs(html, [r'(?:href|src)="([^"]+)"'], out):
        needed.add(rel)
    for css in out.rglob('*.css'):
        for _, rel in local_refs(css, [r'url\(\s*[\'"]?([^\'")]+)'], out):
            needed.add(rel)
    for js in out.rglob('*.js'):
        for _, rel in local_refs(js, [r"""['"]((?:\.{0,2}/)?assets/[^'"]+)['"]"""], out):
            needed.add(rel)
    problems += [f'falta un recurso referenciado: {n}' for n in sorted(needed) if n not in files]

    # 4. compatibilidad con el subdirectorio de Pages
    text = re.sub(r'<!--.*?-->', '', html.read_text(encoding='utf-8'), flags=re.S)
    for m in re.finditer(r'(?:href|src)="(/[^/"][^"]*|/)"', text):
        problems.append(f'ruta absoluta a la raíz (falla bajo /<repo>/): {m.group(1)}')
    for m in re.finditer(r'<(?:link|script|img|source)\b[^>]*\b(?:href|src)="(http://[^"]+)"', text):
        problems.append(f'recurso http:// (contenido mixto bloqueado en HTTPS): {m.group(1)}')
    for css in out.rglob('*.css'):
        for m in re.finditer(r'url\(\s*[\'"]?(/[^/\'")][^\'")]*)', css.read_text(encoding='utf-8')):
            problems.append(f'ruta absoluta a la raíz en {css.relative_to(out)}: {m.group(1)}')

    return files, needed, problems


def main():
    out = pathlib.Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else ROOT / '_site'
    build(out)
    files, needed, problems = verify(out)
    size_kb = sum((out / f).stat().st_size for f in files) / 1024
    print(f'{len(files)} archivos en {out.name}/ ({size_kb:.0f} KB) · {len(needed)} recursos referenciados')
    for f in sorted(files):
        print('  ', f)
    if problems:
        print('\nPROBLEMAS:')
        for p in problems:
            print('  -', p)
        sys.exit(1)
    print('\nOK: no falta nada, no sobra nada y las rutas son válidas bajo un subdirectorio.')


if __name__ == '__main__':
    main()
