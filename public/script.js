document.addEventListener('keydown', e => { if (e.key === 'Escape') document.body.classList.remove('nav-open'); });

        // Gaya dasar grafik
        if (window.Chart) { Chart.defaults.font.family = "Figtree, ui-sans-serif, system-ui, sans-serif"; Chart.defaults.color = '#51635F'; }

        // 0. INISIALISASI FIREBASE
        const firebaseConfig = {
            apiKey: "AIzaSyDklPbRDacQTBqnWyRB2_C2lhKu16CUDp8",
            authDomain: "e-leger-terpadu.firebaseapp.com",
            databaseURL: "https://e-leger-terpadu-default-rtdb.asia-southeast1.firebasedatabase.app",
            projectId: "e-leger-terpadu",
            storageBucket: "e-leger-terpadu.firebasestorage.app",
            messagingSenderId: "797059362314",
            appId: "1:797059362314:web:e827b087937daaf0a639f3",
            measurementId: "G-DESTY7GD0B"
        };

        firebase.initializeApp(firebaseConfig);
        const fbAuth = firebase.auth();
        const fbDb = firebase.database();

        // 1. DEFAULT DATA (SEED REALISTIS KURIKULUM MERDEKA)
        const DEFAULT_CONFIG = {
            mode: "ASAS",
            instansi: "PEMERINTAH PROVINSI DKI JAKARTA • DINAS PENDIDIKAN",
            namaSekolah: "SMP NEGERI 1 NUSANTARA",
            npsn: "20108842",
            alamat: "Jl. Merdeka Pendidikan No. 1, Gambir, Jakarta Pusat",
            kota: "Jakarta",
            tanggalCetak: "19 Juni 2027",
            tahunAjaran: "2026/2027",
            semester: "Genap",
            kepsek: "Dr. H. Ahmad Dahlan, M.Pd.",
            nipKepsek: "19700412 199601 1 002",
            ketuaPanitia: "Rudi Hartono, S.Pd., M.Si.",
            nipKetua: "19830817 200902 1 005",
            // Bobot terpisah ASTS & ASAS
            bobotAstsNH: 50,
            bobotAstsTGS: 0,
            bobotAstsUjian: 50,
            bobotAsasNH: 40,
            bobotAsasTGS: 20,
            bobotAsasUjian: 40
        };

        const DEFAULT_KELAS = [
            { nama: "VII-A", waliKelas: "Dra. Siti Aminah, M.Pd.", nip: "19780312 200501 2 008" },
            { nama: "VII-B", waliKelas: "Bambang Pamungkas, S.Pd.", nip: "19850920 201001 1 012" },
            { nama: "VIII-A", waliKelas: "Nurlaila Sari, S.Si.", nip: "19881105 201402 2 003" }
        ];

        const DEFAULT_MAPEL = [
            { id: "pai", kode: "PAI", nama: "Pendidikan Agama & Budi Pekerti", guru: "Ust. H. Abdul Somad, S.Ag.", kktp: 75, kompetensi: "memahami nilai-nilai keimanan, akhlak mulia, dan praktik ibadah sesuai ajaran agama" },
            { id: "ppkn", kode: "PPKn", nama: "Pendidikan Pancasila", guru: "Dra. Ratna Dewi", kktp: 75, kompetensi: "mengamalkan nilai-nilai Pancasila, norma konstitusi, dan semangat kebhinekaan" },
            { id: "bind", kode: "BIND", nama: "Bahasa Indonesia", guru: "Siti Aminah, M.Pd.", kktp: 75, kompetensi: "menyimak, membaca, memirsa, serta menyajikan teks informatif dan sastra secara efektif" },
            { id: "mtk", kode: "MTK", nama: "Matematika", guru: "Budi Santoso, S.Pd.", kktp: 72, kompetensi: "menyelesaikan masalah bilangan, aljabar, geometri, dan analisis data secara logis" },
            { id: "ipa", kode: "IPA", nama: "Ilmu Pengetahuan Alam", guru: "Nurlaila Sari, S.Si.", kktp: 75, kompetensi: "menganalisis fenomena alam, makhluk hidup, zat, dan energi melalui metode ilmiah" },
            { id: "ips", kode: "IPS", nama: "Ilmu Pengetahuan Sosial", guru: "Drs. Agus Salim", kktp: 75, kompetensi: "memahami interaksi keruangan, perubahan sosial budaya, dan kegiatan ekonomi masyarakat" },
            { id: "bing", kode: "BING", nama: "Bahasa Inggris", guru: "Jessica Mila, S.Pd.", kktp: 72, kompetensi: "berkomunikasi lisan dan tulisan sederhana dalam berbagai konteks sosial sehari-hari" },
            { id: "inf", kode: "INF", nama: "Informatika", guru: "Rizky Febrian, S.Kom.", kktp: 75, kompetensi: "menerapkan berpikir komputasional, literasi digital, dan analisis data berbasis TIK" }
        ];

        const DEFAULT_SISWA = [
            { id: "s1", nis: "2627001", nisn: "0134510001", nama: "Aditya Pratama Putra", jk: "L", kelas: "VII-A", fase: "D" },
            { id: "s2", nis: "2627002", nisn: "0134510002", nama: "Aisyah Azzahra Putri", jk: "P", kelas: "VII-A", fase: "D" },
            { id: "s3", nis: "2627003", nisn: "0134510003", nama: "Bagas Kara Wijaya", jk: "L", kelas: "VII-A", fase: "D" },
            { id: "s4", nis: "2627004", nisn: "0134510004", nama: "Clarissa Putri Maharani", jk: "P", kelas: "VII-A", fase: "D" },
            { id: "s5", nis: "2627005", nisn: "0134510005", nama: "Daffa Arya Nugraha", jk: "L", kelas: "VII-A", fase: "D" },
            { id: "s6", nis: "2627006", nisn: "0134510006", nama: "Elena Kusuma Wardani", jk: "P", kelas: "VII-B", fase: "D" },
            { id: "s7", nis: "2627007", nisn: "0134510007", nama: "Fajar Shidiq Al-Farizi", jk: "L", kelas: "VII-B", fase: "D" },
            { id: "s8", nis: "2627008", nisn: "0134510008", nama: "Gita Savitri Devi", jk: "P", kelas: "VII-B", fase: "D" },
            { id: "s9", nis: "2526011", nisn: "0124510011", nama: "Hafizah Khairunnisa", jk: "P", kelas: "VIII-A", fase: "D" },
            { id: "s10", nis: "2526012", nisn: "0124510012", nama: "Irfan Hakim Maulana", jk: "L", kelas: "VIII-A", fase: "D" }
        ];

        const DEFAULT_EKSKUL_LIST = [
            "Tahfidz Al-Qur'an",
            "Pramuka",
            "Paskibra",
            "Futsal",
            "Palang Merah Remaja (PMR)",
            "Rohis / Keagamaan",
            "Karya Ilmiah Remaja (KIR)",
            "Bola Basket",
            "Paduan Suara",
            "Seni Tari"
        ];

        function isTahfidzName(nama) {
            return (nama || '').toLowerCase().includes('tahfidz');
        }

        function formatTahfidzSummary(t) {
            if (!t) return '';
            const parts = [];
            if (t.capaian) parts.push(`Capaian Hafalan: ${t.capaian}`);
            if (t.bacaan) parts.push(`Kelancaran Bacaan: ${t.bacaan}`);
            if (t.tajwid) parts.push(`Tajwid & Makhraj: ${t.tajwid}`);
            if (t.nilai) parts.push(`Nilai: ${t.nilai}`);
            if (t.catatan) parts.push(t.catatan);
            return parts.join('. ') + (parts.length ? '.' : '');
        }

        function generateSeedScores() {
            const scores = {};
            const baseMap = { s1: 85, s2: 93, s3: 70, s4: 89, s5: 79, s6: 86, s7: 72, s8: 91, s9: 90, s10: 81 };
            DEFAULT_SISWA.forEach((s, idx) => {
                scores[s.id] = {};
                const base = baseMap[s.id] || 82;
                DEFAULT_MAPEL.forEach((m, mIdx) => {
                    if (s.kelas === "VII-B" && m.id === "inf") return;
                    const delta = ((idx * 3 + mIdx * 5) % 11) - 5;
                    scores[s.id][m.id] = {
                        nh: Math.min(98, Math.max(60, base + delta)),
                        tgs: Math.min(99, Math.max(64, base + delta + 2)),
                        ujian: Math.min(98, Math.max(58, base + delta - 1))
                    };
                });
            });
            return scores;
        }

        function generateSeedNonAkademik() {
            const data = {};
            DEFAULT_SISWA.forEach((s, idx) => {
                const tahfidzDetail = idx % 2 === 0
                    ? { capaian: "Juz 30 & Juz 29 (QS. An-Naba' s.d. Al-Mulk)", bacaan: "Sangat Lancar", tajwid: "Mumtaz (Sangat Baik)", nilai: 94, catatan: "Makharijul huruf sangat jelas dan tartil" }
                    : { capaian: "Juz 30 (QS. An-Naba' s.d. An-Nas)", bacaan: "Lancar", tajwid: "Jayyid Jiddan (Baik)", nilai: 86, catatan: "Perlu menjaga muraja'ah harian" };

                data[s.id] = {
                    sakit: idx % 3 === 0 ? 1 : 0,
                    izin: idx % 4 === 0 ? 1 : 0,
                    alpa: s.id === "s3" ? 2 : 0,
                    ekskul: [
                        { nama: "Pramuka", predikat: idx % 2 === 0 ? "Sangat Baik" : "Baik", ket: "Aktif mengikuti latihan kepramukaan dan menunjukkan kedisiplinan tinggi." },
                        { nama: "Tahfidz Al-Qur'an", predikat: idx % 2 === 0 ? "Sangat Baik" : "Baik", ket: formatTahfidzSummary(tahfidzDetail), tahfidz: tahfidzDetail },
                        { nama: "", predikat: "Baik", ket: "" }
                    ],
                    catatan: s.id === "s3"
                        ? "Tingkatkan kehadiran di sekolah dan perbanyak latihan mandiri pada mata pelajaran yang belum mencapai KKTP."
                        : "Prestasi akademik, hafalan Al-Qur'an, dan sikap sangat membanggakan. Pertahankan semangat belajar di semester berikutnya.",
                    keputusan: "Naik ke Kelas Berikutnya"
                };
            });
            return data;
        }

        // 2. STATE MANAGEMENT
        let appConfig = { ...DEFAULT_CONFIG };
        let appKelas = [...DEFAULT_KELAS];
        let appMapel = [...DEFAULT_MAPEL];
        let appEkskulList = [...DEFAULT_EKSKUL_LIST];
        let appSiswa = [...DEFAULT_SISWA];
        let appNilai = {};
        let appNonAkad = {};
        let currentUser = null;
        let stateLoaded = false;
        let saveTimer = null;

        let chartMapelInst = null;
        let chartPredikatInst = null;
        let activeTab = 'dashboard';
        let activeSubLeger = 'leger-kelas';

        // Helper bobot aktif berdasarkan mode ASTS vs ASAS
        function getActiveBobot() {
            if (appConfig.mode === 'ASTS') {
                return {
                    nh: appConfig.bobotAstsNH !== undefined ? appConfig.bobotAstsNH : (appConfig.bobotNH || 50),
                    tgs: appConfig.bobotAstsTGS !== undefined ? appConfig.bobotAstsTGS : (appConfig.bobotTGS || 0),
                    ujian: appConfig.bobotAstsUjian !== undefined ? appConfig.bobotAstsUjian : (appConfig.bobotUjian || 50)
                };
            }
            return {
                nh: appConfig.bobotAsasNH !== undefined ? appConfig.bobotAsasNH : (appConfig.bobotNH || 40),
                tgs: appConfig.bobotAsasTGS !== undefined ? appConfig.bobotAsasTGS : (appConfig.bobotTGS || 20),
                ujian: appConfig.bobotAsasUjian !== undefined ? appConfig.bobotAsasUjian : (appConfig.bobotUjian || 40)
            };
        }

        function buildBundle() {
            return { appConfig, appKelas, appMapel, appEkskulList, appSiswa, appNilai, appNonAkad, updatedAt: Date.now() };
        }

        function saveAllState() {
            syncHeaderAndModeUI();
            if (!stateLoaded) return;
            clearTimeout(saveTimer);
            setSaveStatus('saving');
            saveTimer = setTimeout(() => {
                fbDb.ref('leger_state').set(buildBundle())
                    .then(() => setSaveStatus('saved'))
                    .catch(handleServerError);
            }, 600);
        }

        function setSaveStatus(s) {
            const el = document.getElementById('save-status');
            if (!el) return;
            el.textContent = s === 'saving' ? 'Menyimpan…' : s === 'saved' ? 'Tersimpan di cloud' : 'Gagal menyimpan';
            el.className = 'save-chip ' + (s === 'error' ? 'is-error' : s === 'saving' ? 'is-saving' : 'is-saved');
        }

        function applyLoadedState(p) {
            if (p && p.appConfig && p.appSiswa && p.appMapel) {
                appConfig = { ...DEFAULT_CONFIG, ...p.appConfig };
                appKelas = p.appKelas || [...DEFAULT_KELAS];
                appMapel = p.appMapel;
                appEkskulList = p.appEkskulList || [...DEFAULT_EKSKUL_LIST];
                appSiswa = p.appSiswa;
                appNilai = p.appNilai || {};
                appNonAkad = p.appNonAkad || {};
            } else {
                appNilai = generateSeedScores();
                appNonAkad = generateSeedNonAkademik();
            }
        }

        // 3. HELPER CALCULATIONS
        function hitungNilaiAkhir(comp) {
            if (!comp) return null;
            const b = getActiveBobot();
            
            // Jika bobot > 0, komponen wajib diisi. Jika bobot = 0, boleh kosong (dianggap 0).
            const nhVal = comp.nh !== '' && comp.nh !== undefined ? comp.nh : (b.nh === 0 ? 0 : '');
            const tgsVal = comp.tgs !== '' && comp.tgs !== undefined ? comp.tgs : (b.tgs === 0 ? 0 : '');
            const ujianVal = comp.ujian !== '' && comp.ujian !== undefined ? comp.ujian : (b.ujian === 0 ? 0 : '');

            if ((b.nh > 0 && nhVal === '') || (b.tgs > 0 && tgsVal === '') || (b.ujian > 0 && ujianVal === '')) {
                return null;
            }

            const nh = parseFloat(nhVal) || 0;
            const tgs = parseFloat(tgsVal) || 0;
            const ujian = parseFloat(ujianVal) || 0;

            const na = (nh * (b.nh / 100)) + (tgs * (b.tgs / 100)) + (ujian * (b.ujian / 100));
            return Math.round(na * 10) / 10;
        }

        function getPredikat(nilai, kktp = 75) {
            if (nilai === null || nilai === undefined) return '-';
            if (nilai >= 90) return 'A';
            if (nilai >= 80) return 'B';
            if (nilai >= kktp) return 'C';
            return 'D';
        }

        function generateCapaianKompetensi(mapelObj, nilai) {
            if (nilai === null) return "Nilai belum diinput oleh guru mata pelajaran.";
            const pred = getPredikat(nilai, mapelObj.kktp);
            const komp = mapelObj.kompetensi || `menguasai kompetensi dasar mata pelajaran ${mapelObj.nama}`;
            if (pred === 'A') return `Menunjukkan penguasaan yang sangat baik dalam ${komp}.`;
            if (pred === 'B') return `Menunjukkan penguasaan yang baik dalam ${komp}.`;
            if (pred === 'C') return `Cukup menguasai dalam ${komp}, perlu peningkatan konsistensi belajar.`;
            return `Perlu bimbingan dan pendampingan khusus dalam ${komp}.`;
        }

        function showToast(title, desc, isError = false) {
            const toast = document.getElementById('toast');
            const icon = document.getElementById('toast-icon');
            document.getElementById('toast-title').innerText = title;
            document.getElementById('toast-desc').innerText = desc;
            icon.className = isError
                ? "w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center"
                : "w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center";
            toast.classList.remove('translate-y-24', 'opacity-0');
            setTimeout(() => toast.classList.add('translate-y-24', 'opacity-0'), 3200);
        }

        function openConfirmModal(title, message, onConfirm) {
            document.getElementById('confirm-title').innerText = title;
            document.getElementById('confirm-message').innerText = message;
            document.getElementById('confirm-btn-yes').onclick = () => {
                closeConfirmModal();
                onConfirm();
            };
            document.getElementById('modal-confirm').classList.remove('hidden');
        }
        function closeConfirmModal() { document.getElementById('modal-confirm').classList.add('hidden'); }
        function closeModal(id) { document.getElementById(id).classList.add('hidden'); }

        // 4. MODE SWITCHER (ASTS vs ASAS) & NAVIGATION
        function setAssessmentMode(mode) {
            if (!currentUser || !currentUser.admin) {
                showToast("Akses Dibatasi", "Mode asesmen hanya dapat diubah oleh admin.", true);
                return;
            }
            appConfig.mode = mode;
            saveAllState();
            switchTab(activeTab);
            showToast(
                `Mode ${mode} Aktif`,
                mode === 'ASAS'
                    ? (isKenaikanKelas() ? "Format Rapor Akhir Semester, Ekstrakurikuler & Kenaikan Kelas diaktifkan." : "Format Rapor Akhir Semester & Ekstrakurikuler diaktifkan. Keputusan kenaikan kelas muncul pada semester Genap.")
                    : "Format Rapor Sisipan Tengah Semester (ASTS) diaktifkan."
            );
        }

        function isKenaikanKelas() {
            return appConfig.mode === 'ASAS' && String(appConfig.semester || '').toLowerCase() === 'genap';
        }

        function syncHeaderAndModeUI() {
            const isASAS = appConfig.mode === 'ASAS';
            const b = getActiveBobot();
            document.getElementById('header-school-meta').innerHTML =
                `<span class="sm-name">${esc(appConfig.namaSekolah)}</span>` +
                `<span class="sm-item">TA ${esc(appConfig.tahunAjaran)}</span>` +
                `<span class="sm-item">Semester ${esc(appConfig.semester)}</span>`;

            const ro = document.getElementById('mode-readonly');
            const roTxt = document.getElementById('mode-readonly-text');
            if (roTxt) roTxt.innerText = (isASAS ? 'ASAS' : 'ASTS') + ' sedang aktif';
            const cap = document.getElementById('mode-caption');
            if (cap) cap.innerText = isASAS ? 'Asesmen Sumatif Akhir Semester' : 'Asesmen Sumatif Tengah Semester';
            const btnAsts = document.getElementById('btn-mode-ASTS');
            const btnAsas = document.getElementById('btn-mode-ASAS');
            btnAsts.className = 'seg-btn' + (!isASAS ? ' is-on is-asts' : '');
            btnAsas.className = 'seg-btn' + (isASAS ? ' is-on is-asas' : '');
            btnAsts.setAttribute('aria-pressed', String(!isASAS));
            btnAsas.setAttribute('aria-pressed', String(isASAS));

            document.getElementById('dash-mode-pill').innerText = isASAS ? "Mode ASAS (Akhir Semester)" : "Mode ASTS (Tengah Semester)";
            document.getElementById('dash-mode-pill').className = isASAS ? "pill pill-ok" : "pill pill-warn";
            document.getElementById('dash-bobot-pill').innerText = `Bobot NH ${b.nh}%, TGS ${b.tgs}%, ${appConfig.mode} ${b.ujian}%`;
            document.getElementById('dash-main-title').innerText = isASAS
                ? "Dashboard Panitia Asesmen Sumatif Akhir Semester (ASAS)"
                : "Dashboard Panitia Asesmen Sumatif Tengah Semester (ASTS)";

            document.getElementById('nilai-page-title').innerText = `Input Nilai ${appConfig.mode} & Monitoring Progres Guru`;
            document.getElementById('label-subnav-rapor').innerText = isASAS ? "Cetak Rapor Akhir Semester" : "Cetak Rapor Sisipan ASTS";
        }

        function populateAllSelects() {
            const kelasAllOpts = `<option value="ALL">Semua Kelas (Paralel)</option>` + appKelas.map(k => `<option value="${k.nama}">${k.nama}</option>`).join('');

            ['dash-filter-kelas', 'filter-kelas-siswa'].forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    const prev = el.value;
                    el.innerHTML = kelasAllOpts;
                    if (prev) el.value = prev;
                }
            });

            const optsOf = list => list.map(k => `<option value="${k.nama}">${k.nama}</option>`).join('');
            const kelasPerId = {
                'siswa-kelas': appKelas,
                'input-kelas': kelasBolehNilai(),
                'ekskul-select-kelas': kelasBolehWali(),
                'leger-select-kelas': appKelas
            };
            Object.keys(kelasPerId).forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    const prev = el.value;
                    el.innerHTML = optsOf(kelasPerId[id]);
                    if (prev && kelasPerId[id].some(k => k.nama === prev)) el.value = prev;
                }
            });

            const elMapel = document.getElementById('input-mapel');
            if (elMapel) {
                const prev = elMapel.value;
                const mapelBoleh = mapelBolehNilai();
                elMapel.innerHTML = mapelBoleh.map(m => `<option value="${m.id}">${m.kode} - ${m.nama}</option>`).join('');
                if (prev && mapelBoleh.some(m => m.id === prev)) elMapel.value = prev;
            }
        }

        function switchTab(tabName) {
            if (!tabBoleh(tabName)) {
                showToast("Akses Dibatasi", "Menu ini tidak tersedia untuk akun Anda.", true);
                tabName = 'dashboard';
            }
            activeTab = tabName;
            ['dashboard', 'siswa', 'nilai', 'ekskul', 'leger', 'pengaturan', 'pengguna'].forEach(t => {
                document.getElementById(`tab-${t}`).classList.add('hidden');
                const btn = document.getElementById(`nav-${t}`);
                btn.className = "nav-item"; btn.removeAttribute('aria-current');
            });
            document.getElementById(`tab-${tabName}`).classList.remove('hidden');
            const navAktif = document.getElementById(`nav-${tabName}`);
            navAktif.className = "nav-item is-active"; navAktif.setAttribute('aria-current', 'page');
            toggleSidebar(false);
            window.scrollTo({ top: 0 });

            populateAllSelects();
            if (tabName === 'dashboard') updateDashboard();
            if (tabName === 'siswa') { renderKartuKelas(); renderTabelSiswa(); }
            if (tabName === 'nilai') renderGridInputNilai();
            if (tabName === 'ekskul') renderGridEkskul();
            if (tabName === 'leger') switchSubLeger(activeSubLeger);
            if (tabName === 'pengaturan') loadPengaturanUI();
            if (tabName === 'pengguna') loadPengguna();
            lucide.createIcons();
        }

        // 5. TAB 1: DASHBOARD & STATISTIK
        function updateDashboard() {
            const filterKelas = document.getElementById('dash-filter-kelas').value;
            const filteredSiswa = filterKelas === 'ALL' ? appSiswa : appSiswa.filter(s => s.kelas === filterKelas);

            const laki = filteredSiswa.filter(s => s.jk === 'L').length;
            const perempuan = filteredSiswa.filter(s => s.jk === 'P').length;
            document.getElementById('kpi-total-siswa').innerText = filteredSiswa.length;
            document.getElementById('kpi-gender-detail').innerText = `${laki} laki-laki, ${perempuan} perempuan`;

            let summaries = [];
            let totalNilaiTuntas = 0;
            let totalNilaiTerisi = 0;
            let siswaRemedialCount = 0;
            const totalSelSeharusnya = filteredSiswa.length * appMapel.length;
            let predCount = { A: 0, B: 0, C: 0, D: 0 };

            filteredSiswa.forEach(s => {
                const sNilai = appNilai[s.id] || {};
                let sum = 0, cnt = 0, adaRemedial = false;
                appMapel.forEach(m => {
                    const na = hitungNilaiAkhir(sNilai[m.id]);
                    if (na !== null) {
                        sum += na;
                        cnt++;
                        totalNilaiTerisi++;
                        if (na >= m.kktp) totalNilaiTuntas++;
                        else adaRemedial = true;
                        const pred = getPredikat(na, m.kktp);
                        if (predCount[pred] !== undefined) predCount[pred]++;
                    }
                });
                if (adaRemedial) siswaRemedialCount++;
                const avg = cnt > 0 ? (sum / cnt) : 0;
                summaries.push({ ...s, sum, avg, cnt });
            });

            const validAvgs = summaries.filter(x => x.cnt > 0).map(x => x.avg);
            const overallAvg = validAvgs.length > 0 ? (validAvgs.reduce((a, b) => a + b, 0) / validAvgs.length) : 0;
            const pctProgres = totalSelSeharusnya > 0 ? Math.round((totalNilaiTerisi / totalSelSeharusnya) * 100) : 0;
            const pctTuntas = totalNilaiTerisi > 0 ? Math.round((totalNilaiTuntas / totalNilaiTerisi) * 100) : 0;

            document.getElementById('kpi-rata-rata').innerText = overallAvg.toFixed(2);
            document.getElementById('kpi-progres-input').innerText = `Progres input ${pctProgres}% (${totalNilaiTerisi} dari ${totalSelSeharusnya} sel)`;
            document.getElementById('kpi-ketuntasan').innerText = `${pctTuntas}%`;
            document.getElementById('kpi-ketuntasan-sub').innerText = `${totalNilaiTuntas} dari ${totalNilaiTerisi} nilai tuntas`;
            document.getElementById('kpi-siswa-remedial').innerText = siswaRemedialCount;

            summaries.sort((a, b) => b.avg - a.avg);
            const top5 = summaries.slice(0, 5);
            const tbodyTop5 = document.getElementById('tbody-top5');
            tbodyTop5.innerHTML = top5.length === 0
                ? `<tr><td colspan="7" class="py-6 text-center text-slate-400">Belum ada data siswa.</td></tr>`
                : top5.map((st, idx) => {
                    const medal = idx === 0 ? '🥇 1' : idx === 1 ? '🥈 2' : idx === 2 ? '🥉 3' : `#${idx + 1}`;
                    const pred = getPredikat(st.avg, 75);
                    return `
                        <tr class="hover:bg-slate-50/80 transition">
                            <td class="py-3.5 px-4 text-center font-extrabold text-slate-800">${medal}</td>
                            <td class="py-3.5 px-4 font-mono text-xs text-slate-500">${st.nis} / ${st.nisn}</td>
                            <td class="py-3.5 px-4 font-bold text-slate-900">${st.nama}</td>
                            <td class="py-3.5 px-4 text-center"><span class="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-extrabold">${st.kelas}</span></td>
                            <td class="py-3.5 px-4 text-center font-mono font-semibold text-slate-700">${st.sum.toFixed(1)}</td>
                            <td class="py-3.5 px-4 text-center font-mono font-extrabold text-indigo-600">${st.avg.toFixed(2)}</td>
                            <td class="py-3.5 px-4 text-center"><span class="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-extrabold">${pred}</span></td>
                        </tr>
                    `;
                }).join('');

            const mapelLabels = appMapel.map(m => m.kode);
            const mapelAvgs = appMapel.map(m => {
                let tot = 0, c = 0;
                filteredSiswa.forEach(s => {
                    const na = hitungNilaiAkhir((appNilai[s.id] || {})[m.id]);
                    if (na !== null) { tot += na; c++; }
                });
                return c > 0 ? +(tot / c).toFixed(1) : 0;
            });

            if (chartMapelInst) chartMapelInst.destroy();
            chartMapelInst = new Chart(document.getElementById('chartMapel'), {
                type: 'bar',
                data: {
                    labels: mapelLabels,
                    datasets: [{ label: 'Rata-rata Mapel', data: mapelAvgs, backgroundColor: '#0F6A5E', hoverBackgroundColor: '#0B564C', borderRadius: 6, maxBarThickness: 44 }]
                },
                options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, max: 100, grid: { color: '#E8EEEC' }, border: { display: false }, ticks: { color: '#6B7C78' } }, x: { grid: { display: false }, border: { color: '#DDE5E2' }, ticks: { color: '#51635F' } } }, plugins: { legend: { display: false } } }
            });

            if (chartPredikatInst) chartPredikatInst.destroy();
            chartPredikatInst = new Chart(document.getElementById('chartPredikat'), {
                type: 'doughnut',
                data: {
                    labels: ['A (Sangat Baik)', 'B (Baik)', 'C (Tuntas)', 'D (Remedial)'],
                    datasets: [{
                        data: [predCount.A, predCount.B, predCount.C, predCount.D],
                        backgroundColor: ['#0F6A5E', '#5BA7C4', '#DEA937', '#C9473C'],
                        borderColor: '#ffffff', borderWidth: 2, hoverOffset: 4
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false, cutout: '62%', plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, boxHeight: 10, usePointStyle: true, pointStyle: 'rectRounded', color: '#51635F', font: { size: 12 } } } } }
            });
        }

        // 6. TAB 2: MANAJEMEN SISWA & KELAS
        function renderKartuKelas() {
            document.getElementById('grid-kartu-kelas').innerHTML = appKelas.map(k => {
                const jml = appSiswa.filter(s => s.kelas === k.nama).length;
                return `
                    <div class="kpi-card bg-white p-5 rounded-3xl shadow-sm border border-slate-200/80 flex items-center justify-between">
                        <div>
                            <span class="px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-xl text-xs font-extrabold">${k.nama}</span>
                            <p class="text-sm font-bold text-slate-800 mt-2.5">${k.waliKelas}</p>
                            <p class="text-[11px] font-mono text-slate-400 mt-0.5">NIP. ${k.nip || '-'}</p>
                        </div>
                        <div class="text-right bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-100">
                            <span class="text-2xl font-extrabold text-slate-900">${jml}</span>
                            <p class="text-[11px] uppercase font-bold text-slate-400">Siswa</p>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function renderTabelSiswa() {
            const filterK = document.getElementById('filter-kelas-siswa').value;
            const search = document.getElementById('search-siswa').value.toLowerCase();
            const filtered = appSiswa.filter(s => {
                const matchK = filterK === 'ALL' || s.kelas === filterK;
                const matchS = s.nama.toLowerCase().includes(search) || s.nis.includes(search) || s.nisn.includes(search);
                return matchK && matchS;
            });

            document.getElementById('badge-count-siswa').innerText = `${filtered.length} Siswa`;
            document.getElementById('tbody-siswa').innerHTML = filtered.length === 0
                ? `<tr><td colspan="8" class="py-8 text-center text-slate-400">Tidak ada data siswa ditemukan.</td></tr>`
                : filtered.map((s, idx) => `
                    <tr class="hover:bg-slate-50/80 transition">
                        <td class="py-3.5 px-4 text-center text-slate-500">${idx + 1}</td>
                        <td class="py-3.5 px-4 font-mono text-xs text-slate-600">${s.nis}</td>
                        <td class="py-3.5 px-4 font-mono text-xs text-slate-600">${s.nisn}</td>
                        <td class="py-3.5 px-4 font-bold text-slate-800">${s.nama}</td>
                        <td class="py-3.5 px-4 text-center">
                            <span class="px-2.5 py-0.5 rounded-lg text-xs font-extrabold ${s.jk === 'L' ? 'bg-blue-50 text-blue-700' : 'bg-pink-50 text-pink-700'}">${s.jk}</span>
                        </td>
                        <td class="py-3.5 px-4 text-center"><span class="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-extrabold">${s.kelas}</span></td>
                        <td class="py-3.5 px-4 text-center text-xs font-semibold text-slate-600">Fase ${s.fase || 'D'}</td>
                        <td class="py-3.5 px-4 text-center space-x-1">
                            <button onclick="openModalSiswa('${s.id}')" class="p-1.5 bg-amber-50 text-amber-600 hover:bg-amber-100 rounded-xl transition"><i data-lucide="pencil" class="w-3.5 h-3.5"></i></button>
                            <button onclick="hapusSiswa('${s.id}')" class="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl transition"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
                        </td>
                    </tr>
                `).join('');
            lucide.createIcons();
        }

        function openModalSiswa(id = null) {
            populateAllSelects();
            document.getElementById('modal-siswa').classList.remove('hidden');
            if (id) {
                const s = appSiswa.find(x => x.id === id);
                document.getElementById('modal-siswa-title').innerText = "Edit Data Siswa";
                document.getElementById('siswa-edit-id').value = s.id;
                document.getElementById('siswa-nis').value = s.nis;
                document.getElementById('siswa-nisn').value = s.nisn;
                document.getElementById('siswa-nama').value = s.nama;
                document.getElementById('siswa-jk').value = s.jk;
                document.getElementById('siswa-kelas').value = s.kelas;
                document.getElementById('siswa-fase').value = s.fase || 'D';
            } else {
                document.getElementById('modal-siswa-title').innerText = "Tambah Siswa Baru";
                document.getElementById('form-siswa').reset();
                document.getElementById('siswa-edit-id').value = '';
            }
        }

        function handleSiswaSubmit(e) {
            e.preventDefault();
            const id = document.getElementById('siswa-edit-id').value;
            const payload = {
                nis: document.getElementById('siswa-nis').value.trim(),
                nisn: document.getElementById('siswa-nisn').value.trim(),
                nama: document.getElementById('siswa-nama').value.trim(),
                jk: document.getElementById('siswa-jk').value,
                kelas: document.getElementById('siswa-kelas').value,
                fase: document.getElementById('siswa-fase').value
            };
            if (id) {
                const idx = appSiswa.findIndex(x => x.id === id);
                appSiswa[idx] = { ...appSiswa[idx], ...payload };
                showToast("Siswa Diperbarui", `Data ${payload.nama} berhasil disimpan.`);
            } else {
                const newId = 's' + Date.now();
                appSiswa.push({ id: newId, ...payload });
                appNonAkad[newId] = { sakit: 0, izin: 0, alpa: 0, ekskul: [{ nama: "Pramuka", predikat: "Baik", ket: "Aktif mengikuti kegiatan." }, { nama: "", predikat: "Baik", ket: "" }, { nama: "", predikat: "Baik", ket: "" }], catatan: "Tingkatkan terus prestasi dan kedisiplinan belajar.", keputusan: "Naik ke Kelas Berikutnya" };
                showToast("Siswa Ditambahkan", `${payload.nama} berhasil ditambahkan.`);
            }
            saveAllState();
            closeModal('modal-siswa');
            renderKartuKelas();
            renderTabelSiswa();
        }

        function hapusSiswa(id) {
            const s = appSiswa.find(x => x.id === id);
            openConfirmModal("Hapus Siswa?", `Data dan seluruh nilai atas nama ${s.nama} akan dihapus permanen.`, () => {
                appSiswa = appSiswa.filter(x => x.id !== id);
                delete appNilai[id];
                delete appNonAkad[id];
                saveAllState();
                renderKartuKelas();
                renderTabelSiswa();
                showToast("Siswa Dihapus", "Data siswa berhasil dihapus.");
            });
        }

        function openModalImportSiswa() {
            document.getElementById('textarea-import-siswa').value = '';
            document.getElementById('modal-import-siswa').classList.remove('hidden');
        }

        function prosesImportSiswa() {
            const raw = document.getElementById('textarea-import-siswa').value.trim();
            if (!raw) return showToast("Data Kosong", "Silakan tempel data siswa dari Excel terlebih dahulu.", true);
            const lines = raw.split(/\r?\n/);
            let added = 0;
            lines.forEach((line, i) => {
                const cols = line.split(/	|;|,/).map(c => c.trim());
                if (cols.length >= 3 && cols[2]) {
                    const nis = cols[0] || `2627${100 + i}`;
                    const nisn = cols[1] || `013000${100 + i}`;
                    const nama = cols[2];
                    const jk = (cols[3] && cols[3].toUpperCase().startsWith('P')) ? 'P' : 'L';
                    const kelas = cols[4] || appKelas[0].nama;
                    const fase = cols[5] || 'D';
                    if (!appKelas.some(k => k.nama === kelas)) {
                        appKelas.push({ nama: kelas, waliKelas: "Wali Kelas " + kelas, nip: "-" });
                    }
                    const newId = 's' + Date.now() + '_' + i;
                    appSiswa.push({ id: newId, nis, nisn, nama, jk, kelas, fase });
                    appNonAkad[newId] = { sakit: 0, izin: 0, alpa: 0, ekskul: [{ nama: "Pramuka", predikat: "Baik", ket: "Aktif mengikuti kegiatan." }, { nama: "", predikat: "Baik", ket: "" }, { nama: "", predikat: "Baik", ket: "" }], catatan: "Pertahankan semangat belajarmu.", keputusan: "Naik ke Kelas Berikutnya" };
                    added++;
                }
            });
            saveAllState();
            populateAllSelects();
            closeModal('modal-import-siswa');
            renderKartuKelas();
            renderTabelSiswa();
            showToast("Import Berhasil", `${added} data siswa berhasil diimpor.`);
        }

        function openModalKelas() {
            renderModalKelasList();
            document.getElementById('modal-kelas').classList.remove('hidden');
        }

        function renderModalKelasList() {
            document.getElementById('tbody-modal-kelas').innerHTML = appKelas.map(k => `
                <tr>
                    <td class="py-2 px-3 font-bold">${k.nama}</td>
                    <td class="py-2 px-3">${k.waliKelas}</td>
                    <td class="py-2 px-3 font-mono">${k.nip || '-'}</td>
                    <td class="py-2 px-3 text-center">
                        <button onclick="hapusKelas('${k.nama}')" class="text-rose-600 hover:text-rose-800"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
                    </td>
                </tr>
            `).join('');
            lucide.createIcons();
        }

        function tambahKelasBaru(e) {
            e.preventDefault();
            const nama = document.getElementById('new-kelas-nama').value.trim().toUpperCase();
            const waliKelas = document.getElementById('new-kelas-walas').value.trim();
            const nip = document.getElementById('new-kelas-nip').value.trim();
            if (appKelas.some(k => k.nama === nama)) return showToast("Kelas Sudah Ada", `Rombel ${nama} sudah terdaftar.`, true);
            appKelas.push({ nama, waliKelas, nip });
            saveAllState();
            populateAllSelects();
            renderModalKelasList();
            renderKartuKelas();
            e.target.reset();
            showToast("Kelas Ditambahkan", `Kelas ${nama} berhasil ditambahkan.`);
        }

        function hapusKelas(nama) {
            if (appKelas.length <= 1) return showToast("Gagal", "Minimal harus ada 1 kelas aktif.", true);
            appKelas = appKelas.filter(k => k.nama !== nama);
            saveAllState();
            populateAllSelects();
            renderModalKelasList();
            renderKartuKelas();
            showToast("Kelas Dihapus", `Kelas ${nama} telah dihapus.`);
        }

        // 7. TAB 3: INPUT NILAI MASSAL & MONITORING GURU
        function renderGridInputNilai() {
            const kelas = document.getElementById('input-kelas').value;
            const mapelId = document.getElementById('input-mapel').value;
            const mapelObj = appMapel.find(m => m.id === mapelId) || appMapel[0];
            const b = getActiveBobot();

            document.getElementById('input-header-title').innerText = `${mapelObj.nama} (${mapelObj.kode}) - Kelas ${kelas}`;
            document.getElementById('input-header-meta').innerText = `Guru Pengampu: ${mapelObj.guru} • KKTP: ${mapelObj.kktp}`;
            document.getElementById('th-bobot-nh').innerText = `NH (${b.nh}%)`;
            document.getElementById('th-bobot-tgs').innerText = `TGS (${b.tgs}%)`;
            document.getElementById('th-bobot-ujian').innerText = `${appConfig.mode} (${b.ujian}%)`;

            const siswaKelas = appSiswa.filter(s => s.kelas === kelas);
            const tbody = document.getElementById('tbody-input-nilai');

            tbody.innerHTML = siswaKelas.length === 0
                ? `<tr><td colspan="8" class="py-8 text-center text-slate-400">Belum ada siswa di kelas ${kelas}.</td></tr>`
                : siswaKelas.map((s, idx) => {
                    const comp = (appNilai[s.id] && appNilai[s.id][mapelObj.id]) ? appNilai[s.id][mapelObj.id] : { nh: '', tgs: '', ujian: '' };
                    const na = hitungNilaiAkhir(comp);
                    const pred = getPredikat(na, mapelObj.kktp);
                    const isTuntas = na !== null && na >= mapelObj.kktp;
                    const statusHtml = na === null
                        ? `<span class="text-xs text-slate-400">-</span>`
                        : isTuntas
                            ? `<span class="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-md text-[11px] font-extrabold">TUNTAS</span>`
                            : `<span class="px-2.5 py-0.5 bg-rose-100 text-rose-700 rounded-md text-[11px] font-extrabold">REMEDIAL</span>`;

                    return `
                        <tr class="hover:bg-slate-50/80 transition" data-siswa-id="${s.id}">
                            <td class="py-2.5 px-2.5 text-center text-slate-500 text-xs">${idx + 1}</td>
                            <td class="py-2.5 px-2.5">
                                <p class="font-bold text-slate-800 text-xs">${s.nama}</p>
                                <p class="text-[11px] font-mono text-slate-400">NISN: ${s.nisn}</p>
                            </td>
                            <td class="py-2 px-2"><input type="number" min="0" max="100" step="0.5" value="${comp.nh}" oninput="liveRecalcRow(this, ${mapelObj.kktp})" onkeydown="handleInputEnter(event)" class="grade-input inp-nh w-full bg-white border border-slate-200 rounded-xl p-1.5 text-center font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"></td>
                            <td class="py-2 px-2"><input type="number" min="0" max="100" step="0.5" value="${comp.tgs}" oninput="liveRecalcRow(this, ${mapelObj.kktp})" onkeydown="handleInputEnter(event)" class="grade-input inp-tgs w-full bg-white border border-slate-200 rounded-xl p-1.5 text-center font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"></td>
                            <td class="py-2 px-2"><input type="number" min="0" max="100" step="0.5" value="${comp.ujian}" oninput="liveRecalcRow(this, ${mapelObj.kktp})" onkeydown="handleInputEnter(event)" class="grade-input inp-ujian w-full bg-white border border-slate-200 rounded-xl p-1.5 text-center font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"></td>
                            <td class="py-2.5 px-2 text-center font-mono font-extrabold text-sm bg-indigo-50/40 cell-na ${na !== null && !isTuntas ? 'text-rose-600' : 'text-indigo-900'}">${na !== null ? na.toFixed(1) : '-'}</td>
                            <td class="py-2.5 px-2 text-center font-bold text-xs cell-pred">${pred}</td>
                            <td class="py-2.5 px-2.5 text-center cell-status">${statusHtml}</td>
                        </tr>
                    `;
                }).join('');

            renderMonitoringProgres(kelas);
        }

        function handleInputEnter(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const inputs = Array.from(document.querySelectorAll('.grade-input'));
                const idx = inputs.indexOf(e.target);
                if (idx > -1 && idx + 1 < inputs.length) inputs[idx + 1].focus();
            }
        }

        function liveRecalcRow(el, kktp) {
            const tr = el.closest('tr');
            const nh = tr.querySelector('.inp-nh').value;
            const tgs = tr.querySelector('.inp-tgs').value;
            const ujian = tr.querySelector('.inp-ujian').value;
            const na = hitungNilaiAkhir({ nh, tgs, ujian });
            const cellNa = tr.querySelector('.cell-na');
            const cellPred = tr.querySelector('.cell-pred');
            const cellStatus = tr.querySelector('.cell-status');

            if (na === null) {
                cellNa.innerText = '-';
                cellPred.innerText = '-';
                cellStatus.innerHTML = `<span class="text-xs text-slate-400">-</span>`;
            } else {
                const isTuntas = na >= kktp;
                cellNa.innerText = na.toFixed(1);
                cellNa.className = `py-2.5 px-2 text-center font-mono font-extrabold text-sm bg-indigo-50/40 cell-na ${!isTuntas ? 'text-rose-600' : 'text-indigo-900'}`;
                cellPred.innerText = getPredikat(na, kktp);
                cellStatus.innerHTML = isTuntas
                    ? `<span class="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-md text-[11px] font-extrabold">TUNTAS</span>`
                    : `<span class="px-2.5 py-0.5 bg-rose-100 text-rose-700 rounded-md text-[11px] font-extrabold">REMEDIAL</span>`;
            }
        }

        function simpanGridNilai() {
            const mapelId = document.getElementById('input-mapel').value;
            document.querySelectorAll('#tbody-input-nilai tr[data-siswa-id]').forEach(tr => {
                const sId = tr.getAttribute('data-siswa-id');
                const nh = tr.querySelector('.inp-nh').value;
                const tgs = tr.querySelector('.inp-tgs').value;
                const ujian = tr.querySelector('.inp-ujian').value;
                if (!appNilai[sId]) appNilai[sId] = {};
                if (nh === '' && tgs === '' && ujian === '') delete appNilai[sId][mapelId];
                else appNilai[sId][mapelId] = { nh: nh !== '' ? parseFloat(nh) : '', tgs: tgs !== '' ? parseFloat(tgs) : '', ujian: ujian !== '' ? parseFloat(ujian) : '' };
            });
            saveAllState();
            renderMonitoringProgres(document.getElementById('input-kelas').value);
            showToast("Nilai Tersimpan", `Daftar nilai ${appConfig.mode} berhasil disimpan ke Firebase.`);
        }

        function isiNilaiDemoMapel() {
            const mapelObj = appMapel.find(m => m.id === document.getElementById('input-mapel').value);
            document.querySelectorAll('#tbody-input-nilai tr[data-siswa-id]').forEach(tr => {
                tr.querySelector('.inp-nh').value = Math.floor(Math.random() * 25) + 72;
                tr.querySelector('.inp-tgs').value = Math.floor(Math.random() * 23) + 74;
                const uInp = tr.querySelector('.inp-ujian');
                uInp.value = Math.floor(Math.random() * 28) + 69;
                liveRecalcRow(uInp, mapelObj.kktp);
            });
            showToast("Simulasi Terisi", "Klik 'Simpan Nilai' untuk menyimpan ke database.");
        }

        function renderMonitoringProgres(kelas) {
            document.getElementById('monitoring-kelas-badge').innerText = kelas;
            const siswaKelas = appSiswa.filter(s => s.kelas === kelas);
            const total = siswaKelas.length;
            const container = document.getElementById('container-monitoring-progres');

            if (total === 0) {
                container.innerHTML = `<p class="text-xs text-slate-400 text-center py-6">Tidak ada siswa di kelas ini.</p>`;
                return;
            }

            container.innerHTML = appMapel.map(m => {
                let terisi = 0;
                siswaKelas.forEach(s => { if (hitungNilaiAkhir((appNilai[s.id] || {})[m.id]) !== null) terisi++; });
                const pct = Math.round((terisi / total) * 100);
                const barColor = pct === 100 ? 'bg-emerald-500' : pct > 0 ? 'bg-amber-500' : 'bg-rose-400';
                const statusBadge = pct === 100
                    ? `<span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md text-[11px] font-extrabold">Lengkap (${terisi}/${total})</span>`
                    : `<span class="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md text-[11px] font-extrabold">Belum (${terisi}/${total})</span>`;

                return `
                    <div onclick="document.getElementById('input-mapel').value='${m.id}'; renderGridInputNilai();" class="p-3.5 bg-slate-50/80 border border-slate-200/80 rounded-2xl space-y-1.5 cursor-pointer hover:border-indigo-400 hover:bg-white transition">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-extrabold text-slate-800">${m.kode} - ${m.nama}</span>
                            ${statusBadge}
                        </div>
                        <p class="text-[11px] text-slate-500 truncate">${m.guru}</p>
                        <div class="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                            <div class="${barColor} h-2 rounded-full transition-all" style="width: ${pct}%"></div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // 8. TAB 4: EKSTRAKURIKULER, PENILAIAN TAHFIDZ, KEHADIRAN & CATATAN WALI KELAS
        function getStudentNonAkad(sId) {
            if (!appNonAkad[sId]) {
                appNonAkad[sId] = {
                    sakit: 0, izin: 0, alpa: 0,
                    ekskul: [
                        { nama: "Pramuka", predikat: "Baik", ket: "Aktif mengikuti kegiatan kepramukaan." },
                        { nama: "", predikat: "Baik", ket: "" },
                        { nama: "", predikat: "Baik", ket: "" }
                    ],
                    catatan: "Pertahankan prestasi dan kedisiplinan dalam belajar.",
                    keputusan: "Naik ke Kelas Berikutnya"
                };
            }
            return appNonAkad[sId];
        }

        function handleEksNamaChange(selNama) {
            const block = selNama.closest('.eks-slot-block');
            const tahfidzPanel = block.querySelector('.tahfidz-detail-panel');
            const isTahfidz = isTahfidzName(selNama.value);
            if (isTahfidz) {
                tahfidzPanel.classList.remove('hidden');
                syncTahfidzToKet(block);
            } else {
                tahfidzPanel.classList.add('hidden');
                autoFillEksDesc(block.querySelector('.eks-pred'));
            }
            lucide.createIcons();
        }

        function syncTahfidzToKet(elOrBlock) {
            const block = elOrBlock.classList && elOrBlock.classList.contains('eks-slot-block')
                ? elOrBlock
                : elOrBlock.closest('.eks-slot-block');
            if (!block) return;
            const tObj = {
                capaian: block.querySelector('.thf-capaian').value.trim(),
                bacaan: block.querySelector('.thf-bacaan').value,
                tajwid: block.querySelector('.thf-tajwid').value,
                nilai: block.querySelector('.thf-nilai').value.trim(),
                catatan: block.querySelector('.thf-catatan').value.trim()
            };
            const numVal = parseFloat(tObj.nilai);
            if (!isNaN(numVal)) {
                const predSel = block.querySelector('.eks-pred');
                if (numVal >= 90) predSel.value = 'Sangat Baik';
                else if (numVal >= 80) predSel.value = 'Baik';
                else predSel.value = 'Cukup';
            }
            block.querySelector('.eks-ket').value = formatTahfidzSummary(tObj);
        }

        function renderGridEkskul() {
            const kelas = document.getElementById('ekskul-select-kelas').value;
            const siswaKelas = appSiswa.filter(s => s.kelas === kelas);
            const container = document.getElementById('container-ekskul-siswa');
            const isASAS = appConfig.mode === 'ASAS';

            if (siswaKelas.length === 0) {
                container.innerHTML = `<div class="bg-white p-8 rounded-3xl text-center text-slate-400 border border-slate-200/80">Belum ada siswa di kelas ${kelas}.</div>`;
                return;
            }

            const allOptions = ["", ...appEkskulList];

            container.innerHTML = siswaKelas.map((s, idx) => {
                const naData = getStudentNonAkad(s.id);
                const ekskulRows = [0, 1, 2].map(eIdx => {
                    const eks = naData.ekskul[eIdx] || { nama: '', predikat: 'Baik', ket: '' };
                    const isThf = isTahfidzName(eks.nama);
                    const thf = eks.tahfidz || { capaian: 'Juz 30', bacaan: 'Lancar', tajwid: 'Jayyid Jiddan (Baik)', nilai: '', catatan: '' };
                    const optionList = eks.nama && !allOptions.includes(eks.nama) ? [...allOptions, eks.nama] : allOptions;
                    const opts = optionList.map(opt => `<option value="${opt}" ${eks.nama === opt ? 'selected' : ''}>${opt || '-- Pilih Ekskul --'}</option>`).join('');

                    return `
                        <div class="eks-slot-block space-y-2 p-2.5 rounded-2xl ${isThf ? 'bg-emerald-50/60 border border-emerald-200' : ''}">
                            <div class="grid grid-cols-12 gap-2 items-center">
                                <div class="col-span-4">
                                    <select onchange="handleEksNamaChange(this)" class="eks-nama w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-semibold">${opts}</select>
                                </div>
                                <div class="col-span-3">
                                    <select onchange="autoFillEksDesc(this)" class="eks-pred w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-bold">
                                        <option value="Sangat Baik" ${eks.predikat === 'Sangat Baik' ? 'selected' : ''}>Sangat Baik</option>
                                        <option value="Baik" ${eks.predikat === 'Baik' ? 'selected' : ''}>Baik</option>
                                        <option value="Cukup" ${eks.predikat === 'Cukup' ? 'selected' : ''}>Cukup</option>
                                    </select>
                                </div>
                                <div class="col-span-5">
                                    <input type="text" value="${eks.ket || ''}" placeholder="Keterangan capaian rapor..." class="eks-ket w-full bg-white border border-slate-200 rounded-xl p-2 text-xs">
                                </div>
                            </div>

                            <!-- Panel Penilaian Khusus Tahfidz Al-Qur'an -->
                            <div class="tahfidz-detail-panel ${isThf ? '' : 'hidden'} bg-white border border-emerald-200 rounded-2xl p-3.5 space-y-2.5 shadow-2xs">
                                <div class="flex items-center justify-between border-b border-emerald-100 pb-2">
                                    <span class="text-[11px] font-extrabold text-emerald-800 flex items-center space-x-1.5">
                                        <i data-lucide="book-open-check" class="w-3.5 h-3.5 text-emerald-600"></i>
                                        <span>Instrumen Penilaian Tahfidz Al-Qur'an</span>
                                    </span>
                                    <span class="text-[11px] text-emerald-600 font-semibold">Otomatis dirangkum ke keterangan rapor</span>
                                </div>
                                <div class="grid grid-cols-1 sm:grid-cols-12 gap-2">
                                    <div class="sm:col-span-4">
                                        <label class="block text-[11px] font-bold uppercase text-slate-500 mb-0.5">Capaian Hafalan (Juz / Surah)</label>
                                        <input type="text" value="${thf.capaian || ''}" oninput="syncTahfidzToKet(this)" placeholder="Juz 30 (An-Naba' - An-Nas)" class="thf-capaian w-full bg-slate-50 border border-slate-200 rounded-xl p-1.5 text-xs">
                                    </div>
                                    <div class="sm:col-span-3">
                                        <label class="block text-[11px] font-bold uppercase text-slate-500 mb-0.5">Kelancaran Bacaan</label>
                                        <select onchange="syncTahfidzToKet(this)" class="thf-bacaan w-full bg-slate-50 border border-slate-200 rounded-xl p-1.5 text-xs">
                                            <option value="Sangat Lancar" ${thf.bacaan === 'Sangat Lancar' ? 'selected' : ''}>Sangat Lancar</option>
                                            <option value="Lancar" ${thf.bacaan === 'Lancar' ? 'selected' : ''}>Lancar</option>
                                            <option value="Cukup Lancar" ${thf.bacaan === 'Cukup Lancar' ? 'selected' : ''}>Cukup Lancar</option>
                                            <option value="Perlu Bimbingan" ${thf.bacaan === 'Perlu Bimbingan' ? 'selected' : ''}>Perlu Bimbingan</option>
                                        </select>
                                    </div>
                                    <div class="sm:col-span-3">
                                        <label class="block text-[11px] font-bold uppercase text-slate-500 mb-0.5">Tajwid & Makhraj</label>
                                        <select onchange="syncTahfidzToKet(this)" class="thf-tajwid w-full bg-slate-50 border border-slate-200 rounded-xl p-1.5 text-xs">
                                            <option value="Mumtaz (Sangat Baik)" ${thf.tajwid === 'Mumtaz (Sangat Baik)' ? 'selected' : ''}>Mumtaz (Sangat Baik)</option>
                                            <option value="Jayyid Jiddan (Baik)" ${thf.tajwid === 'Jayyid Jiddan (Baik)' ? 'selected' : ''}>Jayyid Jiddan (Baik)</option>
                                            <option value="Jayyid (Cukup)" ${thf.tajwid === 'Jayyid (Cukup)' ? 'selected' : ''}>Jayyid (Cukup)</option>
                                            <option value="Perlu Pembinaan" ${thf.tajwid === 'Perlu Pembinaan' ? 'selected' : ''}>Perlu Pembinaan</option>
                                        </select>
                                    </div>
                                    <div class="sm:col-span-2">
                                        <label class="block text-[11px] font-bold uppercase text-slate-500 mb-0.5">Nilai (0-100)</label>
                                        <input type="number" min="0" max="100" value="${thf.nilai || ''}" oninput="syncTahfidzToKet(this)" placeholder="90" class="thf-nilai w-full bg-slate-50 border border-slate-200 rounded-xl p-1.5 text-center font-mono font-bold text-xs">
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-[11px] font-bold uppercase text-slate-500 mb-0.5">Catatan Pembina Tahfidz (Opsional)</label>
                                    <input type="text" value="${thf.catatan || ''}" oninput="syncTahfidzToKet(this)" placeholder="Contoh: Makharijul huruf baik, lanjutkan hafalan Juz 29..." class="thf-catatan w-full bg-slate-50 border border-slate-200 rounded-xl p-1.5 text-xs">
                                </div>
                            </div>
                        </div>
                    `;
                }).join('');

                return `
                    <div class="bg-white p-5 rounded-3xl shadow-sm border border-slate-200/80 space-y-4 student-nonakad-card" data-siswa-id="${s.id}">
                        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                            <div class="flex items-center space-x-3">
                                <span class="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100 font-extrabold text-xs flex items-center justify-center">${idx + 1}</span>
                                <div>
                                    <h4 class="font-extrabold text-slate-900 text-sm">${s.nama}</h4>
                                    <p class="text-[11px] font-mono text-slate-400">NIS: ${s.nis} • NISN: ${s.nisn}</p>
                                </div>
                            </div>
                            <!-- Ketidakhadiran -->
                            <div class="flex items-center space-x-2.5 bg-slate-50 px-3.5 py-2 rounded-2xl border border-slate-200/80">
                                <span class="text-[11px] font-extrabold text-slate-500 uppercase mr-1">Absensi:</span>
                                <label class="text-xs font-semibold text-slate-600">Sakit: <input type="number" min="0" value="${naData.sakit}" class="abs-sakit w-12 bg-white border border-slate-200 rounded-lg p-1 text-center font-mono font-bold"></label>
                                <label class="text-xs font-semibold text-slate-600">Izin: <input type="number" min="0" value="${naData.izin}" class="abs-izin w-12 bg-white border border-slate-200 rounded-lg p-1 text-center font-mono font-bold"></label>
                                <label class="text-xs font-semibold text-rose-600">Alpa: <input type="number" min="0" value="${naData.alpa}" class="abs-alpa w-12 bg-white border border-rose-200 rounded-lg p-1 text-center font-mono font-bold text-rose-600"></label>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
                            <!-- Ekstrakurikuler & Tahfidz (8 Kolom) -->
                            <div class="lg:col-span-8 space-y-2">
                                <p class="text-[11px] font-extrabold uppercase text-indigo-700">Kegiatan Ekstrakurikuler & Penilaian Tahfidz (Maks. 3)</p>
                                ${ekskulRows}
                            </div>

                            <!-- Catatan Wali Kelas & Keputusan Kenaikan (4 Kolom) -->
                            <div class="lg:col-span-4 space-y-2">
                                <div class="flex items-center justify-between">
                                    <p class="text-[11px] font-extrabold uppercase text-emerald-700">Catatan Wali Kelas</p>
                                    <button type="button" onclick="generateAutoCatatan('${s.id}', this)" class="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2.5 py-1 rounded-lg flex items-center space-x-1 transition">
                                        <i data-lucide="wand-2" class="w-3 h-3"></i><span>Catatan Otomatis</span>
                                    </button>
                                </div>
                                <textarea rows="3" class="walas-catatan w-full bg-slate-50 border border-slate-200 rounded-2xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500">${naData.catatan}</textarea>
                                ${isKenaikanKelas() ? `
                                    <div class="pt-1">
                                        <label class="block text-[11px] font-bold uppercase text-slate-500 mb-1">Keputusan Kenaikan Kelas (Akhir Tahun Ajaran)</label>
                                        <select class="walas-keputusan w-full bg-emerald-50 border border-emerald-200 text-emerald-950 font-bold rounded-xl p-2 text-xs">
                                            <option value="Naik ke Kelas Berikutnya" ${naData.keputusan === 'Naik ke Kelas Berikutnya' ? 'selected' : ''}>Naik ke Kelas Berikutnya</option>
                                            <option value="Tinggal di Kelas Saat Ini" ${naData.keputusan === 'Tinggal di Kelas Saat Ini' ? 'selected' : ''}>Tinggal di Kelas Saat Ini</option>
                                            <option value="Lulus dari Satuan Pendidikan" ${naData.keputusan === 'Lulus dari Satuan Pendidikan' ? 'selected' : ''}>Lulus dari Satuan Pendidikan</option>
                                            <option value="Belum Lulus" ${naData.keputusan === 'Belum Lulus' ? 'selected' : ''}>Belum Lulus</option>
                                        </select>
                                    </div>
                                `
                                    : (isASAS ? `<p class="text-[11px] text-slate-400 italic pt-1">Keputusan kenaikan kelas diisi pada ASAS semester Genap.</p>` : '')}
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
            lucide.createIcons();
        }

        function autoFillEksDesc(selPred) {
            const block = selPred.closest('.eks-slot-block');
            const nama = block.querySelector('.eks-nama').value;
            const ketInp = block.querySelector('.eks-ket');
            if (!nama) return;
            if (isTahfidzName(nama)) {
                syncTahfidzToKet(block);
                return;
            }
            const pred = selPred.value;
            if (pred === 'Sangat Baik') ketInp.value = `Sangat aktif, berprestasi, dan menunjukkan kepemimpinan dalam kegiatan ${nama}.`;
            else if (pred === 'Baik') ketInp.value = `Aktif mengikuti latihan dan mampu bekerja sama dengan baik dalam kegiatan ${nama}.`;
            else ketInp.value = `Cukup aktif mengikuti kegiatan ${nama}, perlu meningkatkan kehadiran latihan.`;
        }

        function generateAutoCatatan(siswaId, btnEl) {
            const card = btnEl.closest('.student-nonakad-card');
            const sNilai = appNilai[siswaId] || {};
            let sum = 0, cnt = 0, remCount = 0;
            appMapel.forEach(m => {
                const na = hitungNilaiAkhir(sNilai[m.id]);
                if (na !== null) { sum += na; cnt++; if (na < m.kktp) remCount++; }
            });
            const avg = cnt > 0 ? sum / cnt : 0;
            const alpa = parseInt(card.querySelector('.abs-alpa').value) || 0;

            let text = "";
            if (avg >= 88 && remCount === 0) text = "Prestasi akademik sangat membanggakan dan sikap sangat terpuji. Pertahankan semangat belajarmu!";
            else if (remCount === 0) text = "Capaian belajar sudah tuntas pada seluruh mata pelajaran. Terus tingkatkan ketekunan dan keaktifan di kelas.";
            else text = `Perlu meningkatkan konsentrasi dan disiplin belajar terutama pada ${remCount} mata pelajaran yang belum mencapai KKTP.`;

            if (alpa > 0) text += ` Perhatikan juga kedisiplinan kehadiran di sekolah.`;
            card.querySelector('.walas-catatan').value = text;
            showToast("Catatan Dibuat", "Catatan wali kelas otomatis berhasil diterapkan.");
        }

        function simpanSemuaEkskulKelas() {
            document.querySelectorAll('.student-nonakad-card').forEach(card => {
                const sId = card.getAttribute('data-siswa-id');
                const sakit = parseInt(card.querySelector('.abs-sakit').value) || 0;
                const izin = parseInt(card.querySelector('.abs-izin').value) || 0;
                const alpa = parseInt(card.querySelector('.abs-alpa').value) || 0;
                const catatan = card.querySelector('.walas-catatan').value.trim();
                const kepEl = card.querySelector('.walas-keputusan');
                const keputusan = kepEl ? kepEl.value : (getStudentNonAkad(sId).keputusan || "Naik ke Kelas Berikutnya");

                const slotBlocks = card.querySelectorAll('.eks-slot-block');
                const ekskul = Array.from(slotBlocks).map(block => {
                    const nama = block.querySelector('.eks-nama').value;
                    const predikat = block.querySelector('.eks-pred').value;
                    let ket = block.querySelector('.eks-ket').value.trim();
                    const item = { nama, predikat, ket };

                    if (isTahfidzName(nama)) {
                        const tahfidzObj = {
                            capaian: block.querySelector('.thf-capaian').value.trim(),
                            bacaan: block.querySelector('.thf-bacaan').value,
                            tajwid: block.querySelector('.thf-tajwid').value,
                            nilai: block.querySelector('.thf-nilai').value.trim(),
                            catatan: block.querySelector('.thf-catatan').value.trim()
                        };
                        item.tahfidz = tahfidzObj;
                        if (!ket) {
                            item.ket = formatTahfidzSummary(tahfidzObj);
                        }
                    }
                    return item;
                });

                appNonAkad[sId] = { sakit, izin, alpa, ekskul, catatan, keputusan };
            });
            saveAllState();
            showToast("Data Tersimpan", "Ekstrakurikuler, penilaian tahfidz, kehadiran & catatan wali kelas berhasil disimpan.");
        }

        // 9. TAB 5: LEGER KELAS, DAFTAR REMEDIAL & CETAK RAPOR
        function switchSubLeger(sub) {
            activeSubLeger = sub;
            ['leger-kelas', 'remedial', 'rapor'].forEach(s => {
                document.getElementById(`subtab-${s}`).classList.add('hidden');
                document.getElementById(`subnav-${s}`).className = "subnav-btn";
            });
            document.getElementById(`subtab-${sub}`).classList.remove('hidden');
            document.getElementById(`subnav-${sub}`).className = "subnav-btn is-active";
            refreshActiveSubLeger();
        }

        function refreshActiveSubLeger() {
            if (activeSubLeger === 'leger-kelas') renderTabelLegerUtama();
            if (activeSubLeger === 'remedial') renderTabelRemedial();
            if (activeSubLeger === 'rapor') populateRaporStudentDropdown();
        }

        function renderTabelLegerUtama() {
            const kelasNama = document.getElementById('leger-select-kelas').value;
            const kelasObj = appKelas.find(k => k.nama === kelasNama) || { nama: kelasNama, waliKelas: '-', nip: '-' };
            const judulAsesmen = appConfig.mode === 'ASAS'
                ? "ASESMEN SUMATIF AKHIR SEMESTER (ASAS)"
                : "ASESMEN SUMATIF TENGAH SEMESTER (ASTS)";

            document.getElementById('leger-title-kelas').innerText = `Leger Nilai ${appConfig.mode} - Kelas ${kelasNama}`;
            document.getElementById('leger-subtitle-wali').innerText = `Wali Kelas: ${kelasObj.waliKelas} (NIP. ${kelasObj.nip || '-'})`;

            document.getElementById('print-leger-instansi').innerText = appConfig.instansi;
            document.getElementById('print-leger-sekolah').innerText = appConfig.namaSekolah;
            document.getElementById('print-leger-alamat').innerText = `NPSN: ${appConfig.npsn} • ${appConfig.alamat}`;
            document.getElementById('print-leger-judul').innerText = `LEGER NILAI ${judulAsesmen} - KELAS ${kelasNama} - TA ${appConfig.tahunAjaran} (${appConfig.semester.toUpperCase()})`;
            document.getElementById('print-leger-kepsek').innerText = appConfig.kepsek;
            document.getElementById('print-leger-nip-kepsek').innerText = `NIP. ${appConfig.nipKepsek || '-'}`;
            document.getElementById('print-leger-role-ketua').innerText = `Ketua Panitia ${appConfig.mode}`;
            document.getElementById('print-leger-ketua').innerText = appConfig.ketuaPanitia;
            document.getElementById('print-leger-nip-ketua').innerText = `NIP. ${appConfig.nipKetua || '-'}`;
            document.getElementById('print-leger-tgl').innerText = `${appConfig.kota}, ${appConfig.tanggalCetak}`;
            document.getElementById('print-leger-kelas-lbl').innerText = kelasNama;
            document.getElementById('print-leger-walas').innerText = kelasObj.waliKelas;
            document.getElementById('print-leger-nip-walas').innerText = `NIP. ${kelasObj.nip || '-'}`;

            document.getElementById('thead-leger-utama').innerHTML = `
                <tr class="bg-slate-900 text-white uppercase text-[11px] tracking-wider">
                    <th rowspan="2" class="py-2.5 px-2 text-center w-9">No</th>
                    <th rowspan="2" class="py-2.5 px-2.5 text-center">NIS</th>
                    <th rowspan="2" class="py-2.5 px-3 sticky left-0 bg-slate-900 z-10 min-w-[170px]">Nama Peserta Didik</th>
                    <th rowspan="2" class="py-2.5 px-2 text-center">L/P</th>
                    <th colspan="${appMapel.length}" class="py-1.5 px-2 text-center bg-indigo-950 border-b border-indigo-800">Nilai Akhir Mata Pelajaran (KKTP)</th>
                    <th rowspan="2" class="py-2.5 px-2 text-center bg-indigo-900">Jml</th>
                    <th rowspan="2" class="py-2.5 px-2 text-center bg-indigo-900">Rata2</th>
                    <th rowspan="2" class="py-2.5 px-2 text-center bg-amber-600">Rank</th>
                    <th colspan="3" class="py-1.5 px-2 text-center bg-slate-800 border-b border-slate-700">Absensi</th>
                    <th rowspan="2" class="py-2.5 px-2 text-center bg-emerald-900">Ekskul</th>
                    <th rowspan="2" class="py-2.5 px-2 text-center">Status</th>
                </tr>
                <tr class="bg-indigo-950 text-indigo-100 text-[11px]">
                    ${appMapel.map(m => `<th class="py-1.5 px-1.5 text-center">${m.kode}<br><span class="text-[9px] text-indigo-300">(${m.kktp})</span></th>`).join('')}
                    <th class="py-1.5 px-1.5 text-center bg-slate-800">S</th>
                    <th class="py-1.5 px-1.5 text-center bg-slate-800">I</th>
                    <th class="py-1.5 px-1.5 text-center bg-slate-800">A</th>
                </tr>
            `;

            const siswaKelas = appSiswa.filter(s => s.kelas === kelasNama);
            if (siswaKelas.length === 0) {
                document.getElementById('tbody-leger-utama').innerHTML = `<tr><td colspan="${appMapel.length + 12}" class="py-8 text-center text-slate-400">Belum ada siswa di kelas ${kelasNama}.</td></tr>`;
                return;
            }

            let rowsData = siswaKelas.map(s => {
                const sNilai = appNilai[s.id] || {};
                const naData = getStudentNonAkad(s.id);
                let sum = 0, cnt = 0, remCount = 0;
                const scores = {};
                appMapel.forEach(m => {
                    const na = hitungNilaiAkhir(sNilai[m.id]);
                    scores[m.id] = na;
                    if (na !== null) {
                        sum += na; cnt++;
                        if (na < m.kktp) remCount++;
                    }
                });
                const avg = cnt > 0 ? sum / cnt : 0;
                const jmlEkskul = (naData.ekskul || []).filter(e => e.nama && e.nama.trim() !== '').length;
                return { ...s, sum, avg, cnt, scores, remCount, naData, jmlEkskul };
            });

            const sortedRank = [...rowsData].sort((a, b) => b.avg - a.avg);
            rowsData.forEach(r => { r.rank = r.cnt > 0 ? sortedRank.findIndex(x => x.id === r.id) + 1 : '-'; });

            let bodyHtml = rowsData.map((r, idx) => {
                const medal = r.rank === 1 ? '🥇 1' : r.rank === 2 ? '🥈 2' : r.rank === 3 ? '🥉 3' : r.rank;
                const statusBadge = r.cnt === 0
                    ? `<span class="text-slate-400">-</span>`
                    : r.remCount === 0
                        ? `<span class="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[11px] font-bold">Tuntas</span>`
                        : `<span class="px-1.5 py-0.5 bg-rose-100 text-rose-700 rounded text-[11px] font-bold">Rem (${r.remCount})</span>`;

                return `
                    <tr class="hover:bg-indigo-50/40 transition">
                        <td class="py-2 px-2 text-center text-slate-500">${idx + 1}</td>
                        <td class="py-2 px-2 text-center font-mono text-[11px] text-slate-500">${r.nis}</td>
                        <td class="py-2 px-3 font-bold text-slate-800 sticky left-0 bg-white z-10 whitespace-nowrap">${r.nama}</td>
                        <td class="py-2 px-2 text-center">${r.jk}</td>
                        ${appMapel.map(m => {
                            const v = r.scores[m.id];
                            const under = v !== null && v < m.kktp;
                            return `<td class="py-2 px-1.5 text-center font-mono ${under ? 'text-rose-600 font-extrabold bg-rose-50/70' : 'text-slate-700'}">${v !== null ? v.toFixed(1) : '-'}</td>`;
                        }).join('')}
                        <td class="py-2 px-2 text-center font-mono font-bold bg-slate-50">${r.sum.toFixed(1)}</td>
                        <td class="py-2 px-2 text-center font-mono font-extrabold text-indigo-700 bg-indigo-50/40">${r.avg.toFixed(2)}</td>
                        <td class="py-2 px-2 text-center font-extrabold bg-amber-50/50">${medal}</td>
                        <td class="py-2 px-1.5 text-center font-mono">${r.naData.sakit}</td>
                        <td class="py-2 px-1.5 text-center font-mono">${r.naData.izin}</td>
                        <td class="py-2 px-1.5 text-center font-mono ${r.naData.alpa > 0 ? 'text-rose-600 font-bold' : ''}">${r.naData.alpa}</td>
                        <td class="py-2 px-2 text-center font-bold text-emerald-700">${r.jmlEkskul}</td>
                        <td class="py-2 px-2 text-center">${statusBadge}</td>
                    </tr>
                `;
            }).join('');

            const statDefs = [
                { label: "NILAI TERTINGGI", fn: arr => arr.length ? Math.max(...arr).toFixed(1) : '-' },
                { label: "NILAI TERENDAH", fn: arr => arr.length ? Math.min(...arr).toFixed(1) : '-' },
                { label: "RATA-RATA KELAS", fn: arr => arr.length ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1) : '-' },
                { label: "SISWA TUNTAS KKTP", fn: (arr, kktp) => `${arr.filter(v => v >= kktp).length}/${siswaKelas.length}` }
            ];
            statDefs.forEach(st => {
                bodyHtml += `
                    <tr class="bg-slate-100 font-bold text-slate-700 border-t border-slate-300">
                        <td colspan="4" class="py-1.5 px-3 text-right text-[11px] uppercase sticky left-0 bg-slate-100 z-10">${st.label}</td>
                        ${appMapel.map(m => {
                            const vals = rowsData.map(r => r.scores[m.id]).filter(v => v !== null);
                            return `<td class="py-1.5 px-1.5 text-center font-mono text-[11px]">${st.fn(vals, m.kktp)}</td>`;
                        }).join('')}
                        <td colspan="8" class="bg-slate-200/50"></td>
                    </tr>
                `;
            });

            document.getElementById('tbody-leger-utama').innerHTML = bodyHtml;
        }

        function renderTabelRemedial() {
            const scope = document.getElementById('remedial-scope').value;
            const kelasNama = document.getElementById('leger-select-kelas').value;
            document.getElementById('print-rem-sekolah').innerText = appConfig.namaSekolah;
            document.getElementById('print-rem-judul').innerText = `DAFTAR PESERTA REMEDIAL ${appConfig.mode} - TA ${appConfig.tahunAjaran}`;

            const targetSiswa = scope === 'ALL' ? appSiswa : appSiswa.filter(s => s.kelas === kelasNama);
            let list = [];
            targetSiswa.forEach(s => {
                const sNilai = appNilai[s.id] || {};
                appMapel.forEach(m => {
                    const na = hitungNilaiAkhir(sNilai[m.id]);
                    if (na !== null && na < m.kktp) {
                        list.push({ s, m, na, kurang: (m.kktp - na).toFixed(1) });
                    }
                });
            });

            document.getElementById('tbody-remedial').innerHTML = list.length === 0
                ? `<tr><td colspan="8" class="py-8 text-center text-emerald-600 font-bold">Tidak ada siswa yang memerlukan remedial pada cakupan ini.</td></tr>`
                : list.map((item, idx) => `
                    <tr class="hover:bg-rose-50/40">
                        <td class="py-3 px-4 text-center text-slate-500">${idx + 1}</td>
                        <td class="py-3 px-4"><p class="font-bold text-slate-800">${item.s.nama}</p><p class="text-[11px] font-mono text-slate-400">${item.s.nis}</p></td>
                        <td class="py-3 px-4 text-center"><span class="px-2 py-0.5 bg-slate-100 rounded text-xs font-bold">${item.s.kelas}</span></td>
                        <td class="py-3 px-4 font-semibold text-indigo-950">${item.m.nama}</td>
                        <td class="py-3 px-4 text-xs text-slate-600">${item.m.guru}</td>
                        <td class="py-3 px-4 text-center font-mono font-bold">${item.m.kktp}</td>
                        <td class="py-3 px-4 text-center font-mono font-extrabold text-rose-600">${item.na.toFixed(1)}</td>
                        <td class="py-3 px-4 text-center font-mono text-xs font-bold text-rose-700">-${item.kurang}</td>
                    </tr>
                `).join('');
        }

        function populateRaporStudentDropdown() {
            const kelasNama = document.getElementById('leger-select-kelas').value;
            const siswaKelas = appSiswa.filter(s => s.kelas === kelasNama);
            const sel = document.getElementById('rapor-select-siswa');
            sel.innerHTML = siswaKelas.map(s => `<option value="${s.id}">${s.nis} - ${s.nama}</option>`).join('');
            renderRaporIndividu();
        }

        function navigateRaporSiswa(delta) {
            const sel = document.getElementById('rapor-select-siswa');
            if (!sel.options.length) return;
            let nextIdx = sel.selectedIndex + delta;
            if (nextIdx < 0) nextIdx = sel.options.length - 1;
            if (nextIdx >= sel.options.length) nextIdx = 0;
            sel.selectedIndex = nextIdx;
            renderRaporIndividu();
        }

        function renderRaporIndividu() {
            const sId = document.getElementById('rapor-select-siswa').value;
            const container = document.getElementById('lembar-rapor-container');
            const s = appSiswa.find(x => x.id === sId);
            if (!s) {
                container.innerHTML = `<p class="text-center text-slate-400 py-8">Tidak ada siswa di kelas ini.</p>`;
                return;
            }

            const isASAS = appConfig.mode === 'ASAS';
            const kelasObj = appKelas.find(k => k.nama === s.kelas) || { waliKelas: '-', nip: '-' };
            const sNilai = appNilai[s.id] || {};
            const naData = getStudentNonAkad(s.id);

            const judulDokumen = isASAS
                ? "LAPORAN HASIL BELAJAR (RAPOR) AKHIR SEMESTER"
                : "LAPORAN HASIL ASESMEN SUMATIF TENGAH SEMESTER (RAPOR SISIPAN)";

            let sumNa = 0, cntNa = 0;
            const rowsAkademik = appMapel.map((m, idx) => {
                const na = hitungNilaiAkhir(sNilai[m.id]);
                if (na !== null) { sumNa += na; cntNa++; }
                const pred = getPredikat(na, m.kktp);
                const capaian = generateCapaianKompetensi(m, na);
                return `
                    <tr>
                        <td class="py-2 px-2 text-center border border-slate-400">${idx + 1}</td>
                        <td class="py-2 px-3 font-semibold border border-slate-400">${m.nama}</td>
                        <td class="py-2 px-2 text-center font-mono border border-slate-400">${m.kktp}</td>
                        <td class="py-2 px-2 text-center font-mono font-extrabold border border-slate-400 ${na !== null && na < m.kktp ? 'text-rose-600' : ''}">${na !== null ? na.toFixed(1) : '-'}</td>
                        <td class="py-2 px-2 text-center font-bold border border-slate-400">${pred}</td>
                        <td class="py-2 px-3 text-[11px] leading-snug border border-slate-400">${capaian}</td>
                    </tr>
                `;
            }).join('');

            const avg = cntNa > 0 ? (sumNa / cntNa).toFixed(2) : '0.00';

            const activeEks = (naData.ekskul || []).filter(e => e.nama && e.nama.trim() !== '');
            const rowsEkskul = activeEks.length > 0
                ? activeEks.map((e, i) => {
                    const descText = e.ket || (e.tahfidz ? formatTahfidzSummary(e.tahfidz) : '-');
                    return `
                        <tr>
                            <td class="py-1.5 px-2 text-center border border-slate-400">${i + 1}</td>
                            <td class="py-1.5 px-3 font-semibold border border-slate-400">${e.nama}</td>
                            <td class="py-1.5 px-2 text-center font-bold border border-slate-400">${e.predikat}</td>
                            <td class="py-1.5 px-3 text-[11px] leading-snug border border-slate-400">${descText}</td>
                        </tr>
                    `;
                }).join('')
                : `<tr><td colspan="4" class="py-2 px-3 text-center text-slate-500 italic border border-slate-400">Tidak mengikuti kegiatan ekstrakurikuler pilihan.</td></tr>`;

            const kotakKeputusanHtml = isKenaikanKelas() ? `
                <div class="border-2 border-slate-800 p-3 mt-4 text-xs bg-slate-50">
                    <p class="font-bold uppercase text-slate-700">Keputusan Kenaikan Kelas (Tahun Ajaran ${appConfig.tahunAjaran}):</p>
                    <p class="mt-1">Berdasarkan pencapaian seluruh kompetensi sepanjang tahun ajaran ${appConfig.tahunAjaran}, peserta didik ditetapkan: <strong class="uppercase underline text-slate-950">${naData.keputusan || 'Naik ke Kelas Berikutnya'}</strong>.</p>
                </div>
            ` : '';

            container.innerHTML = `
                <!-- Kop Surat Resmi -->
                <div class="border-b-4 border-double border-slate-900 pb-3 mb-5 text-center">
                    <p class="text-[11px] font-bold uppercase tracking-wider text-slate-700">${appConfig.instansi}</p>
                    <h2 class="text-xl font-extrabold uppercase tracking-wide text-slate-950">${appConfig.namaSekolah}</h2>
                    <p class="text-xs text-slate-600">NPSN: ${appConfig.npsn} • ${appConfig.alamat}</p>
                    <h3 class="text-sm font-extrabold uppercase mt-2.5 bg-slate-100 py-1.5 border border-slate-400 tracking-wide">${judulDokumen}</h3>
                </div>

                <!-- Identitas Peserta Didik 2 Kolom -->
                <div class="grid grid-cols-2 gap-6 text-xs mb-5">
                    <table class="w-full">
                        <tr><td class="py-0.5 w-36 font-semibold">Nama Peserta Didik</td><td class="py-0.5 font-bold uppercase">: ${s.nama}</td></tr>
                        <tr><td class="py-0.5 font-semibold">NIS / NISN</td><td class="py-0.5 font-mono">: ${s.nis} / ${s.nisn}</td></tr>
                        <tr><td class="py-0.5 font-semibold">Satuan Pendidikan</td><td class="py-0.5">: ${appConfig.namaSekolah}</td></tr>
                    </table>
                    <table class="w-full">
                        <tr><td class="py-0.5 w-32 font-semibold">Kelas / Fase</td><td class="py-0.5 font-bold">: ${s.kelas} / Fase ${s.fase || 'D'}</td></tr>
                        <tr><td class="py-0.5 font-semibold">Semester</td><td class="py-0.5">: ${appConfig.semester}</td></tr>
                        <tr><td class="py-0.5 font-semibold">Tahun Pelajaran</td><td class="py-0.5">: ${appConfig.tahunAjaran}</td></tr>
                    </table>
                </div>

                <!-- Bagian A: Nilai Akademik -->
                <h4 class="font-bold text-xs uppercase mb-1.5 text-slate-900">A. Nilai Akademik & Capaian Kompetensi</h4>
                <table class="w-full border-collapse text-xs mb-5">
                    <thead>
                        <tr class="bg-slate-200 text-slate-950 font-bold uppercase">
                            <th class="py-2 px-2 border border-slate-400 text-center w-9">No</th>
                            <th class="py-2 px-3 border border-slate-400 text-left w-56">Mata Pelajaran</th>
                            <th class="py-2 px-2 border border-slate-400 text-center w-14">KKTP</th>
                            <th class="py-2 px-2 border border-slate-400 text-center w-16">Nilai Akhir</th>
                            <th class="py-2 px-2 border border-slate-400 text-center w-14">Pred</th>
                            <th class="py-2 px-3 border border-slate-400 text-left">Capaian Kompetensi</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rowsAkademik}
                        <tr class="bg-slate-100 font-bold">
                            <td colspan="3" class="py-2 px-3 text-right border border-slate-400">JUMLAH & RATA-RATA NILAI AKHIR</td>
                            <td class="py-2 px-2 text-center font-mono border border-slate-400">${sumNa.toFixed(1)}</td>
                            <td colspan="2" class="py-2 px-3 font-mono border border-slate-400">Rata-rata: ${avg}</td>
                        </tr>
                    </tbody>
                </table>

                <!-- Bagian B: Kegiatan Ekstrakurikuler & Tahfidz -->
                <h4 class="font-bold text-xs uppercase mb-1.5 text-slate-900">B. Kegiatan Ekstrakurikuler & Pengembangan Diri</h4>
                <table class="w-full border-collapse text-xs mb-5">
                    <thead>
                        <tr class="bg-slate-200 text-slate-950 font-bold uppercase">
                            <th class="py-1.5 px-2 border border-slate-400 text-center w-9">No</th>
                            <th class="py-1.5 px-3 border border-slate-400 text-left w-56">Kegiatan Ekstrakurikuler</th>
                            <th class="py-1.5 px-2 border border-slate-400 text-center w-24">Predikat</th>
                            <th class="py-1.5 px-3 border border-slate-400 text-left">Keterangan / Capaian</th>
                        </tr>
                    </thead>
                    <tbody>${rowsEkskul}</tbody>
                </table>

                <!-- Bagian C & D: Ketidakhadiran & Catatan Wali Kelas -->
                <div class="grid grid-cols-12 gap-4 text-xs">
                    <div class="col-span-5">
                        <h4 class="font-bold text-xs uppercase mb-1.5 text-slate-900">C. Ketidakhadiran</h4>
                        <table class="w-full border-collapse">
                            <tr><td class="py-1.5 px-3 border border-slate-400">Sakit</td><td class="py-1.5 px-3 border border-slate-400 text-center font-mono font-bold w-20">${naData.sakit} hari</td></tr>
                            <tr><td class="py-1.5 px-3 border border-slate-400">Izin</td><td class="py-1.5 px-3 border border-slate-400 text-center font-mono font-bold">${naData.izin} hari</td></tr>
                            <tr><td class="py-1.5 px-3 border border-slate-400">Tanpa Keterangan</td><td class="py-1.5 px-3 border border-slate-400 text-center font-mono font-bold">${naData.alpa} hari</td></tr>
                        </table>
                    </div>
                    <div class="col-span-7 flex flex-col">
                        <h4 class="font-bold text-xs uppercase mb-1.5 text-slate-900">D. Catatan Wali Kelas</h4>
                        <div class="border border-slate-400 p-3 flex-grow italic text-slate-800 leading-relaxed">
                            "${naData.catatan || 'Terus tingkatkan prestasi dan semangat belajar.'}"
                        </div>
                    </div>
                </div>

                ${kotakKeputusanHtml}

                <!-- Tanda Tangan 3 Pihak -->
                <div class="grid grid-cols-3 gap-4 text-center text-xs mt-8">
                    <div>
                        <p>Mengetahui,</p>
                        <p>Orang Tua / Wali Peserta Didik</p>
                        <div class="h-16"></div>
                        <p class="font-bold">( ........................................ )</p>
                    </div>
                    <div>
                        <p>Mengetahui,</p>
                        <p>Kepala Sekolah</p>
                        <div class="h-16"></div>
                        <p class="font-bold underline">${appConfig.kepsek}</p>
                        <p>NIP. ${appConfig.nipKepsek || '-'}</p>
                    </div>
                    <div>
                        <p>${appConfig.kota}, ${appConfig.tanggalCetak}</p>
                        <p>Wali Kelas ${s.kelas}</p>
                        <div class="h-16"></div>
                        <p class="font-bold underline">${kelasObj.waliKelas}</p>
                        <p>NIP. ${kelasObj.nip || '-'}</p>
                    </div>
                </div>
            `;
        }

        // 10. EXPORT EXCEL (.XLSX) DENGAN SHEETJS
        function exportLegerExcel() {
            const kelasNama = document.getElementById('leger-select-kelas').value || appKelas[0].nama;
            const siswaKelas = appSiswa.filter(s => s.kelas === kelasNama);

            const wsData = [
                [appConfig.instansi],
                [appConfig.namaSekolah],
                [`LEGER NILAI ${appConfig.mode} - KELAS ${kelasNama} - TA ${appConfig.tahunAjaran} (${appConfig.semester})`],
                [],
                ["No", "NIS", "NISN", "Nama Lengkap", "L/P", ...appMapel.map(m => `${m.kode} (KKTP ${m.kktp})`), "Jumlah", "Rata-Rata", "Rank", "Sakit", "Izin", "Alpa", "Ekstrakurikuler & Tahfidz"]
            ];

            let rowsData = siswaKelas.map(s => {
                const sNilai = appNilai[s.id] || {};
                const naData = getStudentNonAkad(s.id);
                let sum = 0, cnt = 0;
                const scores = appMapel.map(m => {
                    const na = hitungNilaiAkhir(sNilai[m.id]);
                    if (na !== null) { sum += na; cnt++; return na; }
                    return "";
                });
                const avg = cnt > 0 ? +(sum / cnt).toFixed(2) : 0;
                const eksStr = (naData.ekskul || []).filter(e => e.nama).map(e => {
                    if (isTahfidzName(e.nama) && e.tahfidz) {
                        return `${e.nama} (${e.predikat} - ${e.tahfidz.capaian || ''})`;
                    }
                    return `${e.nama} (${e.predikat})`;
                }).join('; ');
                return { s, scores, sum: +sum.toFixed(1), avg, cnt, naData, eksStr };
            });

            const sorted = [...rowsData].sort((a, b) => b.avg - a.avg);
            rowsData.forEach((r, idx) => {
                const rank = r.cnt > 0 ? sorted.findIndex(x => x.s.id === r.s.id) + 1 : "-";
                wsData.push([idx + 1, r.s.nis, r.s.nisn, r.s.nama, r.s.jk, ...r.scores, r.sum, r.avg, rank, r.naData.sakit, r.naData.izin, r.naData.alpa, r.eksStr]);
            });

            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.aoa_to_sheet(wsData);
            XLSX.utils.book_append_sheet(wb, ws, `Leger_${appConfig.mode}_${kelasNama}`);
            XLSX.writeFile(wb, `Leger_${appConfig.mode}_${kelasNama}_${appConfig.semester}.xlsx`);
            showToast("Export Excel Berhasil", `File Leger_${appConfig.mode}_${kelasNama}.xlsx telah diunduh.`);
        }

        // 11. TAB 6: PENGATURAN SEKOLAH, MAPEL, JENIS EKSKUL & BACKUP
        function loadPengaturanUI() {
            document.getElementById('set-instansi').value = appConfig.instansi;
            document.getElementById('set-nama-sekolah').value = appConfig.namaSekolah;
            document.getElementById('set-npsn').value = appConfig.npsn;
            document.getElementById('set-alamat').value = appConfig.alamat;
            document.getElementById('set-ta').value = appConfig.tahunAjaran;
            document.getElementById('set-semester').value = appConfig.semester;
            document.getElementById('set-kota').value = appConfig.kota;
            document.getElementById('set-tanggal-cetak').value = appConfig.tanggalCetak;
            document.getElementById('set-kepsek').value = appConfig.kepsek;
            document.getElementById('set-nip-kepsek').value = appConfig.nipKepsek;
            document.getElementById('set-ketua').value = appConfig.ketuaPanitia;
            document.getElementById('set-nip-ketua').value = appConfig.nipKetua;

            document.getElementById('set-asts-nh').value = appConfig.bobotAstsNH !== undefined ? appConfig.bobotAstsNH : 50;
            document.getElementById('set-asts-tgs').value = appConfig.bobotAstsTGS !== undefined ? appConfig.bobotAstsTGS : 0;
            document.getElementById('set-asts-ujian').value = appConfig.bobotAstsUjian !== undefined ? appConfig.bobotAstsUjian : 50;

            document.getElementById('set-asas-nh').value = appConfig.bobotAsasNH !== undefined ? appConfig.bobotAsasNH : 40;
            document.getElementById('set-asas-tgs').value = appConfig.bobotAsasTGS !== undefined ? appConfig.bobotAsasTGS : 20;
            document.getElementById('set-asas-ujian').value = appConfig.bobotAsasUjian !== undefined ? appConfig.bobotAsasUjian : 40;

            validasiTotalBobot();
            renderTabelPengaturanMapel();
            renderDaftarEkskulPengaturan();
        }

        function renderDaftarEkskulPengaturan() {
            const container = document.getElementById('list-pengaturan-ekskul');
            container.innerHTML = appEkskulList.map((nama, idx) => {
                const isThf = isTahfidzName(nama);
                return `
                    <div class="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-semibold border ${isThf ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-700'}">
                        <span>${nama}</span>
                        ${isThf ? '<span class="px-1.5 py-0.2 bg-emerald-600 text-white rounded text-[9px] font-bold">Tahfidz</span>' : ''}
                        <button type="button" onclick="hapusEkskulMaster(${idx})" class="text-rose-500 hover:text-rose-700 ml-1" title="Hapus Jenis Ekstra">
                            <i data-lucide="x" class="w-3.5 h-3.5"></i>
                        </button>
                    </div>
                `;
            }).join('');
            lucide.createIcons();
        }

        function tambahEkskulMaster(e) {
            e.preventDefault();
            const inp = document.getElementById('new-ekskul-nama');
            const nama = inp.value.trim();
            if (!nama) return;
            if (appEkskulList.some(x => x.toLowerCase() === nama.toLowerCase())) {
                return showToast("Sudah Terdaftar", `Ekstrakurikuler "${nama}" sudah ada di daftar.`, true);
            }
            appEkskulList.push(nama);
            saveAllState();
            renderDaftarEkskulPengaturan();
            inp.value = '';
            showToast("Ekskul Ditambahkan", `"${nama}" ditambahkan ke pilihan ekstrakurikuler.`);
        }

        function hapusEkskulMaster(idx) {
            if (appEkskulList.length <= 1) return showToast("Gagal", "Minimal harus ada 1 jenis ekstrakurikuler.", true);
            const removed = appEkskulList.splice(idx, 1)[0];
            saveAllState();
            renderDaftarEkskulPengaturan();
            showToast("Ekskul Dihapus", `"${removed}" dihapus dari daftar pilihan.`);
        }

        function validasiTotalBobot() {
            const aNh = parseInt(document.getElementById('set-asts-nh').value) || 0;
            const aTgs = parseInt(document.getElementById('set-asts-tgs').value) || 0;
            const aU = parseInt(document.getElementById('set-asts-ujian').value) || 0;
            const totAsts = aNh + aTgs + aU;
            const badgeAsts = document.getElementById('badge-total-bobot-asts');
            badgeAsts.innerText = `Total: ${totAsts}%`;
            badgeAsts.className = totAsts === 100
                ? "px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-md text-[11px] font-bold"
                : "px-2 py-0.5 bg-rose-100 text-rose-700 rounded-md text-[11px] font-bold";

            const sNh = parseInt(document.getElementById('set-asas-nh').value) || 0;
            const sTgs = parseInt(document.getElementById('set-asas-tgs').value) || 0;
            const sU = parseInt(document.getElementById('set-asas-ujian').value) || 0;
            const totAsas = sNh + sTgs + sU;
            const badgeAsas = document.getElementById('badge-total-bobot-asas');
            badgeAsas.innerText = `Total: ${totAsas}%`;
            badgeAsas.className = totAsas === 100
                ? "px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-md text-[11px] font-bold"
                : "px-2 py-0.5 bg-rose-100 text-rose-700 rounded-md text-[11px] font-bold";

            return totAsts === 100 && totAsas === 100;
        }

        function simpanPengaturanSekolah(e) {
            e.preventDefault();
            if (!validasiTotalBobot()) return showToast("Bobot Tidak Valid", "Jumlah persentase bobot ASTS dan ASAS masing-masing harus tepat 100%.", true);
            appConfig = {
                ...appConfig,
                instansi: document.getElementById('set-instansi').value.trim(),
                namaSekolah: document.getElementById('set-nama-sekolah').value.trim(),
                npsn: document.getElementById('set-npsn').value.trim(),
                alamat: document.getElementById('set-alamat').value.trim(),
                tahunAjaran: document.getElementById('set-ta').value.trim(),
                semester: document.getElementById('set-semester').value,
                kota: document.getElementById('set-kota').value.trim(),
                tanggalCetak: document.getElementById('set-tanggal-cetak').value.trim(),
                kepsek: document.getElementById('set-kepsek').value.trim(),
                nipKepsek: document.getElementById('set-nip-kepsek').value.trim(),
                ketuaPanitia: document.getElementById('set-ketua').value.trim(),
                nipKetua: document.getElementById('set-nip-ketua').value.trim(),
                bobotAstsNH: parseInt(document.getElementById('set-asts-nh').value),
                bobotAstsTGS: parseInt(document.getElementById('set-asts-tgs').value),
                bobotAstsUjian: parseInt(document.getElementById('set-asts-ujian').value),
                bobotAsasNH: parseInt(document.getElementById('set-asas-nh').value),
                bobotAsasTGS: parseInt(document.getElementById('set-asas-tgs').value),
                bobotAsasUjian: parseInt(document.getElementById('set-asas-ujian').value)
            };
            saveAllState();
            showToast("Pengaturan Disimpan", "Identitas sekolah dan bobot nilai telah diperbarui.");
        }

        function renderTabelPengaturanMapel() {
            document.getElementById('tbody-pengaturan-mapel').innerHTML = appMapel.map(m => `
                <tr class="hover:bg-slate-50/80">
                    <td class="py-3 px-3 font-mono font-extrabold text-indigo-700">${m.kode}</td>
                    <td class="py-3 px-3">
                        <p class="font-bold text-slate-800">${m.nama}</p>
                        <p class="text-[11px] text-slate-500">${m.guru}</p>
                    </td>
                    <td class="py-3 px-3 text-center"><span class="px-2.5 py-0.5 bg-slate-100 rounded-lg font-mono font-bold text-xs">${m.kktp}</span></td>
                    <td class="py-3 px-3 text-center space-x-1">
                        <button onclick="openModalMapel('${m.id}')" class="p-1.5 bg-amber-50 text-amber-600 hover:bg-amber-100 rounded-xl transition"><i data-lucide="pencil" class="w-3.5 h-3.5"></i></button>
                        <button onclick="hapusMapel('${m.id}')" class="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl transition"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
                    </td>
                </tr>
            `).join('');
            lucide.createIcons();
        }

        function openModalMapel(id = null) {
            document.getElementById('modal-mapel').classList.remove('hidden');
            if (id) {
                const m = appMapel.find(x => x.id === id);
                document.getElementById('modal-mapel-title').innerText = "Edit Mata Pelajaran";
                document.getElementById('mapel-edit-id').value = m.id;
                document.getElementById('mapel-kode').value = m.kode;
                document.getElementById('mapel-nama').value = m.nama;
                document.getElementById('mapel-guru').value = m.guru;
                document.getElementById('mapel-kktp').value = m.kktp;
                document.getElementById('mapel-kompetensi').value = m.kompetensi || '';
            } else {
                document.getElementById('modal-mapel-title').innerText = "Tambah Mata Pelajaran";
                document.getElementById('mapel-edit-id').value = '';
                document.getElementById('mapel-kode').value = '';
                document.getElementById('mapel-nama').value = '';
                document.getElementById('mapel-guru').value = '';
                document.getElementById('mapel-kktp').value = 75;
                document.getElementById('mapel-kompetensi').value = '';
            }
        }

        function handleMapelSubmit(e) {
            e.preventDefault();
            const id = document.getElementById('mapel-edit-id').value;
            const payload = {
                kode: document.getElementById('mapel-kode').value.trim().toUpperCase(),
                nama: document.getElementById('mapel-nama').value.trim(),
                guru: document.getElementById('mapel-guru').value.trim(),
                kktp: parseInt(document.getElementById('mapel-kktp').value) || 75,
                kompetensi: document.getElementById('mapel-kompetensi').value.trim()
            };
            if (id) {
                const idx = appMapel.findIndex(x => x.id === id);
                appMapel[idx] = { ...appMapel[idx], ...payload };
                showToast("Mapel Diperbarui", `Mata pelajaran ${payload.nama} berhasil disimpan.`);
            } else {
                appMapel.push({ id: 'm' + Date.now(), ...payload });
                showToast("Mapel Ditambahkan", `Mata pelajaran ${payload.nama} berhasil ditambahkan.`);
            }
            saveAllState();
            populateAllSelects();
            closeModal('modal-mapel');
            renderTabelPengaturanMapel();
        }

        function hapusMapel(id) {
            if (appMapel.length <= 1) return showToast("Gagal", "Minimal harus ada 1 mata pelajaran.", true);
            openConfirmModal("Hapus Mata Pelajaran?", "Seluruh nilai siswa pada mata pelajaran ini akan ikut terhapus.", () => {
                appMapel = appMapel.filter(m => m.id !== id);
                Object.keys(appNilai).forEach(sId => delete appNilai[sId][id]);
                saveAllState();
                populateAllSelects();
                renderTabelPengaturanMapel();
                showToast("Mapel Dihapus", "Mata pelajaran berhasil dihapus.");
            });
        }

        function backupDataJSON() {
            const bundle = { appConfig, appKelas, appMapel, appEkskulList, appSiswa, appNilai, appNonAkad, exportedAt: new Date().toISOString() };
            const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Backup_Leger_${appConfig.mode}_${appConfig.tahunAjaran.replace('/', '-')}.json`;
            a.click();
            URL.revokeObjectURL(url);
            showToast("Backup Berhasil", "File cadangan JSON berhasil diunduh.");
        }

        function restoreDataJSON(event) {
            const file = event.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const p = JSON.parse(e.target.result);
                    if (p.appConfig && p.appSiswa && p.appMapel) {
                        appConfig = { ...DEFAULT_CONFIG, ...p.appConfig };
                        appKelas = p.appKelas || DEFAULT_KELAS;
                        appMapel = p.appMapel;
                        appEkskulList = p.appEkskulList || [...DEFAULT_EKSKUL_LIST];
                        appSiswa = p.appSiswa;
                        appNilai = p.appNilai || {};
                        appNonAkad = p.appNonAkad || {};
                        saveAllState();
                        switchTab('dashboard');
                        showToast("Restore Berhasil", "Database berhasil dipulihkan ke Firebase dari file JSON.");
                    } else showToast("Format Tidak Valid", "File JSON tidak sesuai struktur aplikasi.", true);
                } catch { showToast("Gagal Membaca File", "Pastikan file JSON tidak rusak.", true); }
            };
            reader.readAsText(file);
        }

        function konfirmasiResetData() {
            openConfirmModal("Reset ke Data Simulasi Awal?", "Semua perubahan yang tersimpan akan dihapus dan dikembalikan ke data awal.", () => {
                appConfig = { ...DEFAULT_CONFIG };
                appKelas = [...DEFAULT_KELAS];
                appMapel = [...DEFAULT_MAPEL];
                appEkskulList = [...DEFAULT_EKSKUL_LIST];
                appSiswa = [...DEFAULT_SISWA];
                appNilai = generateSeedScores();
                appNonAkad = generateSeedNonAkademik();
                saveAllState();
                switchTab('dashboard');
                showToast("Reset Selesai", "Aplikasi dikembalikan ke data simulasi awal.");
            });
        }

        // ===================== LOGIN, PERAN & SESI (FIREBASE RTDB) =====================
        function emailKey(email) {
            return String(email || '').trim().toLowerCase().replace(/\./g, ',').replace(/[#$\[\]\/]/g, '_');
        }

        async function sha256Hex(str) {
            const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(String(str)));
            return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
        }

        function hasList(list, a, b) {
            if (!list) return false;
            if (list.includes('*')) return true;
            const low = list.map(x => String(x).toLowerCase());
            return [a, b].some(c => c && low.includes(String(c).toLowerCase()));
        }
        function kelasBolehNilai() {
            if (!currentUser || currentUser.admin) return appKelas;
            return appKelas.filter(k => hasList(currentUser.kelasAjar, k.nama));
        }
        function kelasBolehWali() {
            if (!currentUser || currentUser.admin) return appKelas;
            return appKelas.filter(k => hasList(currentUser.kelasWali, k.nama));
        }
        function mapelBolehNilai() {
            if (!currentUser || currentUser.admin) return appMapel;
            return appMapel.filter(m => hasList(currentUser.mapel, m.id, m.kode));
        }
        function tabBoleh(t) {
            if (!currentUser || currentUser.admin) return true;
            if (t === 'dashboard' || t === 'leger') return true;
            if (t === 'nilai') return mapelBolehNilai().length > 0 && kelasBolehNilai().length > 0;
            if (t === 'ekskul') return kelasBolehWali().length > 0;
            return false;
        }
        function applyRoleUI() {
            ['dashboard', 'siswa', 'nilai', 'ekskul', 'leger', 'pengaturan', 'pengguna'].forEach(t => {
                const b = document.getElementById('nav-' + t);
                if (b) b.style.display = tabBoleh(t) ? '' : 'none';
            });
            // sembunyikan judul grup yang semua menunya tersembunyi
            document.querySelectorAll('.nav-group').forEach(g => {
                const adaYangTampil = Array.from(g.querySelectorAll('.nav-item')).some(b => b.style.display !== 'none');
                g.style.display = adaYangTampil ? '' : 'none';
            });
            const admin = currentUser.admin;
            const seg = document.getElementById('mode-seg');
            if (seg) seg.style.display = admin ? '' : 'none';
            const roBadge = document.getElementById('mode-readonly');
            if (roBadge) roBadge.style.display = admin ? 'none' : '';
            const parts = [];
            if (admin) parts.push('Admin');
            else {
                if ((currentUser.mapel || []).length) parts.push('Guru ' + currentUser.mapel.join('/'));
                if ((currentUser.kelasWali || []).length) parts.push('Wali ' + currentUser.kelasWali.join('/'));
                if (!parts.length) parts.push('Hanya melihat');
            }
            document.getElementById('user-name').innerText = currentUser.nama;
            document.getElementById('user-role').innerText = parts.join(', ');
            const ini = String(currentUser.nama || currentUser.email || '?').replace(/[^A-Za-z\u00C0-\u024F ]/g, ' ').trim().split(/\s+/).filter(Boolean);
            document.getElementById('user-avatar').innerText = ((ini[0] || '?')[0] + ((ini.length > 1 ? ini[1][0] : '') || '')).toUpperCase();
            const box = document.getElementById('user-box');
            box.classList.remove('hidden'); box.classList.add('flex');
        }

        function toggleSidebar(force) {
            const open = typeof force === 'boolean' ? force : !document.body.classList.contains('nav-open');
            document.body.classList.toggle('nav-open', open);
        }

        function showLogin(msg) {
            const ld = document.getElementById('app-loading');
            if (ld) ld.classList.add('hidden');
            const ls = document.getElementById('login-screen');
            ls.classList.remove('hidden'); ls.classList.add('flex');
            const er = document.getElementById('login-error');
            if (msg) { er.innerText = msg; er.classList.remove('hidden'); } else er.classList.add('hidden');
            const btn = document.getElementById('login-btn');
            btn.disabled = false; btn.innerText = 'Masuk ke Sistem';
            lucide.createIcons();
            setTimeout(() => { const e = document.getElementById('login-email'); if (e) e.focus(); }, 50);
        }
        function hideLogin() {
            const ls = document.getElementById('login-screen');
            ls.classList.add('hidden'); ls.classList.remove('flex');
        }

        function handleServerError(err) {
            setSaveStatus('error');
            showToast('Gagal Menyimpan ke Firebase', (err && err.message) || 'Periksa koneksi internet atau aturan Firebase.', true);
        }

        async function loadStateAndStart(userObj) {
            currentUser = {
                email: userObj.email,
                nama: userObj.nama || userObj.email,
                admin: !!userObj.admin,
                aktif: userObj.aktif !== false,
                mapel: userObj.mapel || [],
                kelasAjar: userObj.kelasAjar || [],
                kelasWali: userObj.kelasWali || []
            };
            try { sessionStorage.setItem('leger_user_email', currentUser.email); } catch (e) {}

            let val = null;
            try {
                const fetchPromise = fbDb.ref('leger_state').once('value');
                const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout koneksi database')), 8000));
                const snap = await Promise.race([fetchPromise, timeoutPromise]);
                val = snap.val();
            } catch (e) {
                console.warn('Gagal menarik data cloud dalam 8 detik, menggunakan fallback lokal/default:', e);
            }

            applyLoadedState(val);
            stateLoaded = true;
            hideLogin();
            applyRoleUI();
            startApp();
            if (!val && currentUser.admin) {
                saveAllState();
            }
        }

        async function doLogin() {
            const email = document.getElementById('login-email').value.trim().toLowerCase();
            const pin = document.getElementById('login-pin').value.trim();
            if (!email || !pin) { showLogin('Isi email dan PIN.'); return; }

            const btn = document.getElementById('login-btn');
            btn.disabled = true; btn.innerText = 'Memeriksa…';

            try {
                if (!fbAuth.currentUser) {
                    await Promise.race([
                        fbAuth.signInAnonymously(),
                        new Promise((_, reject) => setTimeout(() => reject(new Error('Koneksi ke server autentikasi habis waktu (timeout). Periksa internet atau pengaturan Firebase.')), 8000))
                    ]);
                }

                const usersSnap = await Promise.race([
                    fbDb.ref('leger_users').once('value'),
                    new Promise((_, reject) => setTimeout(() => reject(new Error('Koneksi ke Firebase Realtime Database habis waktu (timeout).')), 8000))
                ]);
                const allUsers = usersSnap.val();
                const pinHash = await sha256Hex(pin);

                // Jika database pengguna masih kosong (pertama kali instalasi), akun pertama otomatis menjadi Admin
                if (!allUsers) {
                    if (pin.length < 6) {
                        showLogin('PIN minimal 6 karakter untuk membuat akun Admin pertama.');
                        return;
                    }
                    const firstAdmin = {
                        email,
                        nama: 'Administrator',
                        admin: true,
                        aktif: true,
                        mapel: ['*'],
                        kelasAjar: ['*'],
                        kelasWali: ['*'],
                        pinHash
                    };
                    await fbDb.ref('leger_users/' + emailKey(email)).set(firstAdmin);
                    document.getElementById('login-pin').value = '';
                    await loadStateAndStart(firstAdmin);
                    showToast('Admin Terdaftar', 'Akun pertama otomatis ditetapkan sebagai Administrator.');
                    return;
                }

                const u = allUsers[emailKey(email)];
                if (!u) {
                    showLogin('Email tidak terdaftar. Hubungi admin.');
                    return;
                }
                if (u.aktif === false) {
                    showLogin('Akun Anda dinonaktifkan oleh admin.');
                    return;
                }
                if (!u.pinHash || u.pinHash !== pinHash) {
                    showLogin('PIN salah. Silakan coba lagi.');
                    return;
                }

                document.getElementById('login-pin').value = '';
                await loadStateAndStart(u);
            } catch (err) {
                showLogin('Gagal terhubung ke Firebase: ' + ((err && err.message) || err));
            }
        }

        function doLogout() {
            try { sessionStorage.removeItem('leger_user_email'); } catch (e) {}
            location.reload();
        }

        // ===================== KELOLA PENGGUNA (FIREBASE RTDB) =====================
        let penggunaList = [];

        function esc(s) {
            return String(s === null || s === undefined ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
        }
        function acakPin() {
            const a = new Uint32Array(1);
            (window.crypto || window.msCrypto).getRandomValues(a);
            return String(100000 + (a[0] % 900000));
        }

        async function loadPengguna() {
            const tb = document.getElementById('tbody-pengguna');
            tb.innerHTML = '<tr><td colspan="4" class="p-6 text-center text-slate-400 text-sm">Memuat dari Firebase…</td></tr>';
            try {
                const snap = await fbDb.ref('leger_users').once('value');
                const obj = snap.val() || {};
                penggunaList = Object.values(obj).map(u => ({
                    email: u.email || '',
                    nama: u.nama || u.email || '',
                    admin: !!u.admin,
                    aktif: u.aktif !== false,
                    mapel: u.mapel || [],
                    kelasAjar: u.kelasAjar || [],
                    kelasWali: u.kelasWali || [],
                    adaPin: !!u.pinHash,
                    pinHash: u.pinHash || ''
                }));
                renderPengguna();
            } catch (err) {
                tb.innerHTML = '';
                showToast('Gagal Memuat Pengguna', (err && err.message) || 'Terjadi kesalahan.', true);
            }
        }

        function ringkasHak(u) {
            if (u.admin) return '<span class="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-lg text-[11px] font-bold">Admin</span> <span class="text-xs text-slate-500">akses penuh</span>';
            const bagian = [];
            if (u.mapel.length) bagian.push(`<div><span class="text-[11px] font-bold text-slate-500">Nilai:</span> ${esc(u.mapel.join(', '))} <span class="text-slate-400">di</span> ${esc(u.kelasAjar.length ? u.kelasAjar.join(', ') : '(belum ada kelas)')}</div>`);
            if (u.kelasWali.length) bagian.push(`<div><span class="text-[11px] font-bold text-slate-500">Wali kelas:</span> ${esc(u.kelasWali.join(', '))}</div>`);
            return bagian.length ? bagian.join('') : '<span class="text-xs text-slate-400 italic">Hanya melihat (belum diberi hak input)</span>';
        }

        function renderPengguna() {
            const tb = document.getElementById('tbody-pengguna');
            if (!penggunaList.length) { tb.innerHTML = '<tr><td colspan="4" class="p-6 text-center text-slate-400 text-sm">Belum ada pengguna.</td></tr>'; return; }
            tb.innerHTML = penggunaList.map((u, i) => {
                const saya = currentUser && u.email.toLowerCase() === currentUser.email.toLowerCase();
                const status = !u.aktif ? '<span class="px-2.5 py-0.5 bg-slate-200 text-slate-600 rounded-lg text-[11px] font-bold">Nonaktif</span>'
                    : !u.adaPin ? '<span class="px-2.5 py-0.5 bg-amber-100 text-amber-700 rounded-lg text-[11px] font-bold">Belum ada PIN</span>'
                    : '<span class="px-2.5 py-0.5 bg-emerald-100 text-emerald-700 rounded-lg text-[11px] font-bold">Aktif</span>';
                return `
                <tr class="hover:bg-slate-50/80 align-top">
                    <td class="py-3.5 px-4"><div class="font-bold text-slate-900">${esc(u.nama)} ${saya ? '<span class="text-[11px] text-indigo-600 font-bold">(Anda)</span>' : ''}</div><div class="text-xs text-slate-500">${esc(u.email)}</div></td>
                    <td class="py-3.5 px-4 text-xs text-slate-700 space-y-0.5">${ringkasHak(u)}</td>
                    <td class="py-3.5 px-4 text-center">${status}</td>
                    <td class="py-3.5 px-4 text-center whitespace-nowrap">
                        <button onclick="openModalPengguna(${i})" class="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-[11px] font-bold transition">Edit</button>
                        <button onclick="resetPinPengguna(${i})" class="px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-xl text-[11px] font-bold transition">Reset PIN</button>
                        ${saya ? '' : `<button onclick="hapusPengguna(${i})" class="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl text-[11px] font-bold transition">Hapus</button>`}
                    </td>
                </tr>`;
            }).join('');
            lucide.createIcons();
        }

        function chipHtml(cls, val, label, checked, extra) {
            return `<label class="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer">
                <input type="checkbox" class="${cls} w-3.5 h-3.5" value="${esc(val)}" ${checked ? 'checked' : ''} ${extra || ''}><span>${esc(label)}</span></label>`;
        }
        function renderChipList(containerId, cls, items, selected) {
            const sel = (selected || []).map(x => String(x).toLowerCase());
            const semua = sel.includes('*');
            const dipakai = new Set();
            let html = chipHtml(cls + '-semua', '*', 'Semua', semua, `onchange="toggleChipSemua('${containerId}', '${cls}', this)"`);
            items.forEach(it => {
                const cocok = it.alts.some(a => sel.includes(String(a).toLowerCase()));
                if (cocok) it.alts.forEach(a => dipakai.add(String(a).toLowerCase()));
                html += chipHtml(cls, it.val, it.label, cocok && !semua, semua ? 'disabled' : '');
            });
            (selected || []).forEach(x => {
                const k = String(x).toLowerCase();
                if (k !== '*' && !dipakai.has(k)) html += chipHtml(cls, x, x + ' (tidak dikenal)', !semua, semua ? 'disabled' : '');
            });
            document.getElementById(containerId).innerHTML = html;
        }
        function toggleChipSemua(containerId, cls, el) {
            document.querySelectorAll(`#${containerId} input.${cls}`).forEach(c => { c.disabled = el.checked; if (el.checked) c.checked = false; });
        }
        function ambilChip(containerId, cls) {
            const semua = document.querySelector(`#${containerId} input.${cls}-semua`);
            if (semua && semua.checked) return ['*'];
            return Array.from(document.querySelectorAll(`#${containerId} input.${cls}:checked`)).map(c => c.value);
        }
        function togglePgAdmin() {
            document.getElementById('pg-hak').style.display = document.getElementById('pg-admin').checked ? 'none' : '';
        }

        function openModalPengguna(i) {
            const baru = i < 0;
            const u = baru ? { email: '', nama: '', admin: false, aktif: true, mapel: [], kelasAjar: [], kelasWali: [], adaPin: false } : penggunaList[i];
            document.getElementById('modal-pengguna-title').innerText = baru ? 'Tambah Pengguna' : 'Ubah Pengguna';
            document.getElementById('pg-email-lama').value = baru ? '' : u.email;
            document.getElementById('pg-email').value = u.email;
            document.getElementById('pg-nama').value = u.nama;
            document.getElementById('pg-admin').checked = u.admin;
            document.getElementById('pg-aktif').checked = u.aktif;
            document.getElementById('pg-pin').value = '';
            document.getElementById('pg-pin-hint').innerText = baru ? '(kosongkan untuk PIN acak)' : '(kosongkan jika tidak diubah)';
            const kelasItems = appKelas.map(k => ({ val: k.nama, label: k.nama, alts: [k.nama] }));
            renderChipList('pg-mapel-list', 'pg-mapel', appMapel.map(m => ({ val: m.kode, label: m.kode, alts: [m.kode, m.id] })), u.mapel);
            renderChipList('pg-ajar-list', 'pg-ajar', kelasItems, u.kelasAjar);
            renderChipList('pg-wali-list', 'pg-wali', kelasItems, u.kelasWali);
            togglePgAdmin();
            const b = document.getElementById('pg-simpan-btn'); b.disabled = false; b.innerText = 'Simpan';
            document.getElementById('modal-pengguna').classList.remove('hidden');
            lucide.createIcons();
        }

        async function simpanPengguna() {
            const emailLama = document.getElementById('pg-email-lama').value.trim().toLowerCase();
            const email = document.getElementById('pg-email').value.trim().toLowerCase();
            const nama = document.getElementById('pg-nama').value.trim() || email;
            const admin = document.getElementById('pg-admin').checked;
            const aktif = document.getElementById('pg-aktif').checked;
            const mapel = ambilChip('pg-mapel-list', 'pg-mapel');
            const kelasAjar = ambilChip('pg-ajar-list', 'pg-ajar');
            const kelasWali = ambilChip('pg-wali-list', 'pg-wali');
            let pinRaw = document.getElementById('pg-pin').value.trim();

            if (!email) { showToast('Email Kosong', 'Isi email pengguna.', true); return; }

            const b = document.getElementById('pg-simpan-btn'); b.disabled = true; b.innerText = 'Menyimpan…';
            try {
                const existing = penggunaList.find(x => x.email.toLowerCase() === (emailLama || email));
                let pinBaruTampil = '';
                let pinHash = existing ? existing.pinHash : '';

                if (!emailLama && !pinRaw) {
                    pinRaw = acakPin();
                }
                if (pinRaw) {
                    if (pinRaw.length < 6) {
                        b.disabled = false; b.innerText = 'Simpan';
                        showToast('PIN Terlalu Pendek', 'PIN minimal 6 karakter.', true);
                        return;
                    }
                    pinHash = await sha256Hex(pinRaw);
                    pinBaruTampil = pinRaw;
                }

                if (emailLama && emailLama !== email) {
                    await fbDb.ref('leger_users/' + emailKey(emailLama)).remove();
                }
                await fbDb.ref('leger_users/' + emailKey(email)).set({
                    email, nama, admin, aktif, mapel, kelasAjar, kelasWali, pinHash
                });

                closeModal('modal-pengguna');
                await loadPengguna();
                if (pinBaruTampil) {
                    tampilHasilPin(emailLama ? 'PIN Diubah' : 'Pengguna Dibuat', [{ email, nama, status: emailLama ? 'PIN diubah' : 'Akun dibuat', pin: pinBaruTampil }]);
                } else {
                    showToast('Tersimpan', 'Data pengguna diperbarui di Firebase.');
                }
            } catch (err) {
                b.disabled = false; b.innerText = 'Simpan';
                showToast('Gagal Menyimpan', (err && err.message) || 'Terjadi kesalahan.', true);
            }
        }

        function resetPinPengguna(i) {
            const u = penggunaList[i];
            openConfirmModal('Atur Ulang PIN?', `PIN ${u.nama} akan diganti dengan PIN acak baru.`, async () => {
                try {
                    const newPin = acakPin();
                    const pinHash = await sha256Hex(newPin);
                    await fbDb.ref('leger_users/' + emailKey(u.email) + '/pinHash').set(pinHash);
                    await loadPengguna();
                    tampilHasilPin('PIN Baru', [{ email: u.email, nama: u.nama, status: 'PIN direset', pin: newPin }]);
                } catch (err) {
                    showToast('Gagal Reset PIN', (err && err.message) || 'Terjadi kesalahan.', true);
                }
            });
        }

        function hapusPengguna(i) {
            const u = penggunaList[i];
            openConfirmModal('Hapus Pengguna?', `Akun ${u.nama} (${u.email}) akan dihapus dan tidak bisa login lagi.`, async () => {
                try {
                    await fbDb.ref('leger_users/' + emailKey(u.email)).remove();
                    await loadPengguna();
                    showToast('Terhapus', 'Pengguna berhasil dihapus.');
                } catch (err) {
                    showToast('Gagal Menghapus', (err && err.message) || 'Terjadi kesalahan.', true);
                }
            });
        }

        function tampilHasilPin(judul, rows) {
            document.getElementById('pin-hasil-title').innerText = judul;
            document.getElementById('pin-hasil-body').innerHTML = rows.map(r => `
                <tr class="${r.status === 'ditolak' ? 'bg-rose-50' : ''}">
                    <td class="py-1.5 px-3">${esc(r.email)}</td><td class="py-1.5 px-3">${esc(r.nama)}</td>
                    <td class="py-1.5 px-3">${esc(r.status)}${r.error ? ' – ' + esc(r.error) : ''}</td>
                    <td class="py-1.5 px-3 font-mono font-bold">${esc(r.pin || '')}</td>
                </tr>`).join('');
            document.getElementById('pin-hasil-text').value = rows.filter(r => r.pin).map(r => [r.nama, r.email, r.pin].join('\t')).join('\n');
            document.getElementById('modal-pin-hasil').classList.remove('hidden');
        }
        function salinHasilPin() {
            const ta = document.getElementById('pin-hasil-text');
            ta.focus(); ta.select();
            let ok = false;
            try { ok = document.execCommand('copy'); } catch (e) {}
            showToast(ok ? 'Tersalin' : 'Salin Manual', ok ? 'Daftar PIN disalin ke clipboard.' : 'Tekan Ctrl+C untuk menyalin teks yang terpilih.', !ok);
        }

        function openModalImportPengguna() {
            document.getElementById('imp-pg-text').value = '';
            document.getElementById('imp-pg-error').classList.add('hidden');
            const b = document.getElementById('imp-pg-btn'); b.disabled = false; b.innerText = 'Proses Impor';
            document.getElementById('modal-import-pengguna').classList.remove('hidden');
        }

        async function prosesImportPengguna() {
            const baris = document.getElementById('imp-pg-text').value.split(/\r?\n/).filter(l => l.trim());
            const rows = [], galat = [];
            const mapelOk = new Set(appMapel.flatMap(m => [m.kode, m.id]).map(x => String(x).toLowerCase()));
            const kelasOk = new Set(appKelas.map(k => k.nama.toLowerCase()));
            const daftar = v => String(v || '').split(/[,;]/).map(x => x.trim()).filter(Boolean);
            baris.forEach((line, idx) => {
                const sep = line.includes('	') ? '	' : null;
                const c = (sep ? line.split(sep) : [line]).map(x => x.trim());
                if (idx === 0 && !c[0].includes('@')) return;
                const no = idx + 1;
                if (!sep && line.includes(',') && line.includes('@') && line.split(',').length > 2) {
                    galat.push(`Baris ${no}: kolom harus dipisah tab. Salin langsung dari Excel/Google Sheets, bukan teks CSV.`); return;
                }
                const [email, nama, mapel, ajar, wali] = c;
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || '')) { galat.push(`Baris ${no}: email "${email || ''}" tidak valid.`); return; }
                daftar(mapel).filter(x => x !== '*' && !mapelOk.has(x.toLowerCase())).forEach(x => galat.push(`Baris ${no}: mapel "${x}" tidak ada di daftar mapel.`));
                daftar(ajar).concat(daftar(wali)).filter(x => x !== '*' && !kelasOk.has(x.toLowerCase())).forEach(x => galat.push(`Baris ${no}: kelas "${x}" tidak ada di daftar kelas.`));
                rows.push({ email: email.toLowerCase(), nama: nama || email.toLowerCase(), mapel: daftar(mapel), kelasAjar: daftar(ajar), kelasWali: daftar(wali) });
            });
            const er = document.getElementById('imp-pg-error');
            if (galat.length) { er.innerText = galat.slice(0, 12).join('\n') + (galat.length > 12 ? `\n…dan ${galat.length - 12} masalah lain.` : ''); er.classList.remove('hidden'); return; }
            if (!rows.length) { er.innerText = 'Tidak ada baris data untuk diimpor.'; er.classList.remove('hidden'); return; }
            er.classList.add('hidden');
            const b = document.getElementById('imp-pg-btn'); b.disabled = true; b.innerText = 'Memproses…';

            try {
                const results = [];
                for (const r of rows) {
                    const existing = penggunaList.find(x => x.email.toLowerCase() === r.email);
                    if (existing) {
                        await fbDb.ref('leger_users/' + emailKey(r.email)).update({
                            nama: r.nama, mapel: r.mapel, kelasAjar: r.kelasAjar, kelasWali: r.kelasWali
                        });
                        results.push({ email: r.email, nama: r.nama, status: 'diperbarui', pin: '' });
                    } else {
                        const pin = acakPin();
                        const pinHash = await sha256Hex(pin);
                        await fbDb.ref('leger_users/' + emailKey(r.email)).set({
                            email: r.email, nama: r.nama, admin: false, aktif: true,
                            mapel: r.mapel, kelasAjar: r.kelasAjar, kelasWali: r.kelasWali, pinHash
                        });
                        results.push({ email: r.email, nama: r.nama, status: 'baru', pin });
                    }
                }
                closeModal('modal-import-pengguna');
                await loadPengguna();
                tampilHasilPin(`Hasil Impor (${results.filter(r => r.status === 'baru').length} baru)`, results);
            } catch (err) {
                b.disabled = false; b.innerText = 'Proses Impor';
                showToast('Gagal Impor', (err && err.message) || 'Terjadi kesalahan.', true);
            }
        }

        function startApp() {
            syncHeaderAndModeUI();
            populateAllSelects();
            switchTab('dashboard');
            lucide.createIcons();
            const ld = document.getElementById('app-loading');
            if (ld) ld.remove();
            const shell = document.getElementById('app-shell');
            if (shell) shell.classList.add('is-ready');
        }

        window.onload = async function() {
            try {
                const authPromise = fbAuth.signInAnonymously();
                const timeoutAuth = new Promise((_, reject) => setTimeout(() => reject(new Error('Auth timeout')), 6000));
                await Promise.race([authPromise, timeoutAuth]);

                let savedEmail = '';
                try { savedEmail = sessionStorage.getItem('leger_user_email') || ''; } catch (e) {}
                if (!savedEmail) {
                    showLogin('');
                    return;
                }
                const userPromise = fbDb.ref('leger_users/' + emailKey(savedEmail)).once('value');
                const timeoutUser = new Promise((_, reject) => setTimeout(() => reject(new Error('User fetch timeout')), 6000));
                const uSnap = await Promise.race([userPromise, timeoutUser]);
                const u = uSnap.val();
                if (!u || u.aktif === false) {
                    try { sessionStorage.removeItem('leger_user_email'); } catch (e) {}
                    showLogin('');
                    return;
                }
                await loadStateAndStart(u);
            } catch (err) {
                console.warn('Kendala jaringan/auth saat inisialisasi, mengalihkan ke layar login:', err);
                showLogin('');
            }
        };
