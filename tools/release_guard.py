#!/usr/bin/env python3
"""VesperFolio source archive preflight. No external dependencies or network use."""
import sys, hashlib
from pathlib import Path
from zipfile import ZipFile

BAD={'.pdf','.docx','.doc','.odt','.rtf','.png','.jpeg','.jpg','.gif','.webp','.bmp','.tif','.tiff','.heic','.avif','.apk','.aab','.jks','.keystore','.p12','.pem','.key'}
ALLOWED={'.html','.md','.txt','.py','.cjs','.json','.gitignore','license'}
REQUIRED={'index.html','README.md','QA.md','PRIVACY.md','SECURITY.md','TERMS.md','ATTRIBUTION.md','LICENSING.md','LICENSE','SOURCE-SHA256.txt','CONTRIBUTING.md','CHANGELOG.md','RELEASE-NOTES-v2.3.2.md','RELEASE-CHECKLIST.md','GITHUB-UPLOAD.md','BASELINE-SHA256.txt','PREVIOUS-SHA256.txt','tools/release_guard.py'}
ROOT='VesperFolio-Web-v2.3.2/'

def fail(s): raise SystemExit('FAIL: '+s)
def check(zippath):
    with ZipFile(zippath) as z:
        if z.testzip(): fail('ZIP failed CRC check')
        files={}
        for entry in z.infolist():
            name=entry.filename
            if entry.is_dir():continue
            if not name.startswith(ROOT): fail('file outside release root: '+name)
            rel=name[len(ROOT):]
            if not rel or any(p in ('','..') for p in Path(rel).parts) or rel.startswith('/') or '\\' in rel: fail('unsafe path: '+rel)
            suffix=Path(rel).suffix.lower() or Path(rel).name.lower()
            if suffix in BAD:fail('private/generated output in ZIP: '+rel)
            if suffix not in ALLOWED:fail('unexpected file type: '+rel)
            if rel in files:fail('duplicate file: '+rel)
            files[rel]=z.read(name)
        missing=REQUIRED-set(files)
        if missing:fail('required file missing: '+str(sorted(missing)))
        app=files['index.html'];sha=hashlib.sha256(app).hexdigest()
        if sha!='56bd4334d7b86442aa7e190cdfc282f1ed6dd062ee8fe7e8e99fbf1cf6e9ce4a':fail('index.html does not match verified v2.3.2')
        for record in ('BASELINE-SHA256.txt','PREVIOUS-SHA256.txt'):
            for line in files[record].decode().splitlines():
                if not line.strip():continue
                expect,ref=line.split(None,1)
                if ref not in files:fail('missing baseline: '+ref)
                if hashlib.sha256(files[ref]).hexdigest()!=expect:fail('baseline hash mismatch: '+ref)
        recorded={}
        for line in files['SOURCE-SHA256.txt'].decode('utf-8').splitlines():
            if not line.strip():continue
            expect,ref=line.split(None,1)
            if ref in recorded:fail('duplicate manifest item: '+ref)
            recorded[ref]=expect
        if set(recorded)!=(set(files)-{'SOURCE-SHA256.txt'}):
            fail('manifest members do not match ZIP members')
        for ref,expect in recorded.items():
            if hashlib.sha256(files[ref]).hexdigest()!=expect:
                fail('source SHA-256 mismatch: '+ref)
        if b'With Vesper' not in app:fail('footer signature missing')
        if not b"connect-src 'none'" in app: fail('network-restrictive CSP missing')
        return len(files),sha

if __name__=='__main__':
    if len(sys.argv)!=2:fail('usage: python release_guard.py release.zip')
    n,digest=check(sys.argv[1]);print(f'PASS: {n} allowed files, ZIP CRC, baselines, application SHA-256 and privacy exclusions.\nApplication SHA-256: {digest}')
