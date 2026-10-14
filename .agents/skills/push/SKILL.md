---
name: push
description: >-
  Gunakan skill ini ketika pengguna mengetik perintah "push", "/push", atau meminta untuk commit, merge, pull, dan push ke branch main secara otomatis.
---

# Automated Git Push & Sync Workflow

Skill ini menangani perintah otomatis untuk melakukan commit, merge, pull, dan push ke branch `main`.

## Prosedur Eksekusi

Jalankan perintah PowerShell berikut di root repositori:

```powershell
powershell -ExecutionPolicy Bypass -File .\sync.ps1
```

Jika pengguna menyertakan custom commit message (contoh: `push "update index.html"`):

```powershell
powershell -ExecutionPolicy Bypass -File .\sync.ps1 -CommitMessage "update index.html"
```

## Mekanisme di Balik Layar

Script [sync.ps1](file:///c:/Users/eng/.gemini/antigravity-ide/scratch/yudhitwicaksono.github.io/sync.ps1) melakukan:
1. Menjalankan DNS Helper Proxy lokal (127.0.0.1:8080) dengan upstream Google & Cloudflare DNS untuk mencegah timeout jaringan ke GitHub.
2. Memeriksa modifikasi lokal; jika ada, melakukan `git add .` dan `git commit`.
3. Jika aktif di branch lain selain `main`, berpindah ke `main` dan me-merge branch tersebut.
4. Menjalankan `git pull origin main` untuk sinkronisasi perubahan remote.
5. Menjalankan `git push origin main` untuk mengunggah semua perubahan.
6. Mematikan DNS Helper Proxy dengan aman.
