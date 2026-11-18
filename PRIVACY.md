# Privacy

Applies to this v2.3.2 web-app source as supplied, dated 18 November 2026.

The application processes selected images locally. It includes no upload endpoint, account, cookies, analytics, remote font, network library, fetch or WebSocket calls. Its content security policy blocks application connections. This is a source-level finding, not a complete security certification.

Images, edits, thumbnails and up to eight Undo snapshots are held in memory; there is no application session database or automatic save. Clear pages retains Undo. Discard session removes both active-page and Undo references; browser and operating system memory disposal is outside this app's control. No secure deletion is promised. Closing or reloading loses the session. Original files are untouched.

PDF and DOCX exports are saved through browser download handling or an optional Android wrapper. Files remain in your chosen destination. The app cannot confirm ordinary browser downloads have completed. A successful wrapper save depends on that wrapper's implementation. The wrapper itself must be reviewed separately.

Printing passes images to your selected print service, which may use a network or cloud. Manual uploads of exports, browser extensions, device backups and operating system services follow their own policies. If served from a website, its hosting provider may log the page request even though this web-app has no analytics. Download and open locally for operation without a host request.

Exports are not encrypted and contain visible image content. They omit source filenames from the embedded image names, but may still reveal any private information visible in your pictures. Keep sensitive originals and exports in appropriate device storage.
