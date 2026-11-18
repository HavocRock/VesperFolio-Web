# Security notes

Local processing and no application network access reduce data transmission; they do not establish complete security. Browser image decoders, extensions, the OS and optional wrappers remain outside this source's control. Import only files you trust and keep your browser current.

A restrictive meta content security policy blocks network connections, external scripts, frames through default-src, objects and forms. Inline script/style remain necessary in this single-file build. A hosting service can add stronger response headers. Filenames are inserted into text nodes rather than interpreted as markup; download names are sanitised. Undo shares source canvases instead of making bitmap copies. Memory limits reduce retained data but cannot constrain decoder peak allocation.

Do not post private documents in public issues. For a vulnerability, use a repository's private reporting channel if its maintainer enables one. No security contact or reporting service is configured by this package.
