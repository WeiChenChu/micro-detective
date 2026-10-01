"""Generate original Final Case SVGs from shared fin/cell geometry and project fish art.
Run: python scripts/generate-fin-illustrations.py (standard library only).
"""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/images/investigation'
OUT.mkdir(exist_ok=True)

def svg(body, dark=False):
    return '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600" fill="none"><rect width="800" height="600" rx="32" fill="'+('#101e32' if dark else '#F5FAFC')+'"/>'+body+'</svg>\n'

def fin(growth=1):
    # Left-pointing tail matches the existing right-facing zebrafish.
    x=400-230*growth
    path=f'M650 240 Q590 260 550 275 L400 220 L{x} 110 L{x+25*growth} 300 L{x} 490 L400 380 L550 325 Q590 340 650 360Z'
    rays=''.join(f'<path d="M570 300 L{x+15} {y}"/>' for y in [135,200,270,330,400,465])
    return f'<defs><clipPath id="fin-{int(growth*100)}"><path d="{path}"/></clipPath></defs><path d="{path}" fill="#B9D9E1" stroke="#527C95" stroke-width="5" stroke-linejoin="round"/><g stroke="#6D94A7" stroke-width="3" clip-path="url(#fin-{int(growth*100)})">{rays}</g><path d="M400 200V400" stroke="#975724" stroke-width="5" stroke-dasharray="10 8"/>'

fish=(ROOT/'public/images/naked-eye/zebrafish.svg').read_text(encoding='utf-8')
fish=re.sub(r'^<svg[^>]*>|</svg>\s*$','',fish)
# Body ends at x=209; the cut at x=195 stays posterior to the peduncle.
fish=fish.replace('<path d="M263 311L151 221L168 304L151 395Z" fill="#B9D9E1" stroke="#527C95" stroke-width="5" stroke-linejoin="round"/>','<path d="M263 311L195 256L195 362Z" fill="#B9D9E1" stroke="#527C95" stroke-width="5"/><path d="M195 256L151 221L168 304L151 395L195 362" stroke="#8E9EA9" stroke-width="3" stroke-dasharray="8 8"/><path d="M195 256V362" stroke="#975724" stroke-width="7"/>')
fish=fish.replace('M245 311L171 240M242 314L179 302M245 315L171 379','M245 311L197 270M242 314L197 306M245 315L197 352')
opening=fish+'<circle cx="177" cy="310" r="100" stroke="#975724" stroke-width="5" stroke-dasharray="10 8"/><path d="M215 403L275 466" stroke="#975724" stroke-width="4"/><text x="292" y="507" fill="#315E7D" font-family="sans-serif" font-size="58" font-weight="bold">?</text>'
(OUT/'fin-injury.svg').write_text(svg(opening),encoding='utf-8',newline='\n')

panels=''
for i,(day,growth) in enumerate([(0,0),(3,.22),(7,.6),(14,1)]):
    x=20+(i%2)*390; y=20+(i//2)*285
    panels+=f'<g transform="translate({x} {y})"><rect width="370" height="265" rx="18" fill="#E9F4F8"/><text x="20" y="40" fill="#315E7D" font-family="sans-serif" font-size="30" font-weight="bold">D{day}</text><g transform="translate(-28 5) scale(.58 .48)">{fin(growth)}</g></g>'
(OUT/'fin-regrowth.svg').write_text(svg(panels),encoding='utf-8',newline='\n')

# Whole-fin tissue evidence reuses the fin geometry, without suggesting cell detail.
wound='<g transform="translate(-170 -75) scale(1.25)">'+fin(.6)+'<ellipse cx="390" cy="300" rx="80" ry="150" stroke="#975724" stroke-width="4" stroke-dasharray="10 8"/></g>'
(OUT/'fin-wound.svg').write_text(svg(wound),encoding='utf-8',newline='\n')

# Identical cell coordinates in both views make the shared region recognizable.
cells=[]
for row in range(5):
    for col in range(9):
        if col>=5 and row%2: continue
        x=125+col*65+(row%2)*14; y=270+row*58
        active=col<5 and (row+col)%3!=0
        cells.append((x,y,active,row,col))
for dark,name in [(False,'fin-tissue'),(True,'fin-fluorescence')]:
    body='<g transform="translate(40 -15) scale(.35)">'+fin(.6)+'</g>'
    body+='<rect x="145" y="63" width="42" height="70" rx="6" stroke="#975724" stroke-width="5" fill="none"/><path d="M146 139L95 208M188 139L702 208" stroke="#975724" stroke-width="3" stroke-dasharray="8 8"/>'
    body+='<rect x="75" y="215" width="650" height="350" rx="70" fill="'+('#162b43' if dark else '#E7EFF1')+'" stroke="#94ACB8" stroke-width="4"/><path d="M473 221V559" stroke="#C7864D" stroke-width="4" stroke-dasharray="9 9"/>'
    for x,y,active,row,col in cells:
        body+=f'<ellipse cx="{x}" cy="{y}" rx="{[22,26,24][(row+col)%3] if col<5 else 29}" ry="{[20,24,21][(row+col)%3] if col<5 else 24}" fill="'+('#1c344b' if dark else ('#DAE6DB' if col<5 else '#D8E6EE'))+'" stroke="'+('#577080' if dark else '#94ACB8')+'" stroke-width="2"/>'
        body+=f'<ellipse cx="{x}" cy="{y}" rx="10" ry="13" fill="'+('#A5AFF1' if dark else '#819CAC')+'"/>'
        if dark and active:
            body+=f'<ellipse cx="{x}" cy="{y}" rx="15" ry="18" fill="none" stroke="#DCF474" stroke-width="5"/>'
    # Non-color cue: fluorescent nuclei have a ring as well as a brighter signal.
    (OUT/(name+'.svg')).write_text(svg(body,dark),encoding='utf-8',newline='\n')
