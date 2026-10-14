# Project Rules & Automated Commands

## Perintah Chat "push" (Automated Git Sync)
Ketika user mengirimkan chat dengan kata **"push"** (atau `/push`, `push`, `git push`, dsb.):
1. **Langsung jalankan perintah sinkronisasi otomatis**:
   ```powershell
   powershell -ExecutionPolicy Bypass -File .\sync.ps1
   ```
   *Jika user menyertakan pesan commit (misalnya: `push "perbaikan tampilan header"`), oper argumen pesan tersebut:*
   ```powershell
   powershell -ExecutionPolicy Bypass -File .\sync.ps1 -CommitMessage "perbaikan tampilan header"
   ```
2. **Alur kerja otomatis yang dijalankan oleh script**:
   - `git add .` (staging semua perubahan lokal).
   - `git commit` (commit otomatis dengan pesan timestamp atau pesan dari user jika diberikan).
   - Cek branch: jika sedang berada di branch lain, switch ke `main` dan merge branch tersebut ke `main`.
   - `git pull origin main` (tarik dan gabungkan update terbaru dari branch main di GitHub).
   - `git push origin main` (unggah commit ke branch main di GitHub).
   - Memanfaatkan DNS Helper Proxy bawaan `sync.ps1` agar koneksi ke GitHub selalu lancar tanpa kendala DNS / timeout.
3. **Konfirmasi ke User**:
   Setelah proses selesai, laporkan ringkasan status commit, merge, pull, dan push kepada user.
