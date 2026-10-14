# Perintah Chat "push"

Ketika pengguna mengetik perintah chat "push" (atau `/push`), sistem harus otomatis menjalankan:
`powershell -ExecutionPolicy Bypass -File .\sync.ps1`

Workflow ini mencakup:
1. `git add .` dan commit otomatis
2. Merge branch aktif ke `main` jika sedang di branch selain `main`
3. `git pull origin main`
4. `git push origin main`
