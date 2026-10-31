/**
 * Ringkasan "inti" per pertemuan: satu kalimat target yang bisa dicek sendiri.
 * Ditampilkan paling atas agar siswa langsung tahu apa yang harus bisa setelah pertemuan.
 */
export const MEETING_GOALS: Record<string, string> = {
  // GITAR
  "guitar-1": "Hafal 6 senar & nomor jari, lalu bunyikan C, G, Am, Fmaj7 dengan jernih.",
  "guitar-2": "Pindah akord sambil tangan kanan terus mengayun (pola D-D-U-U-D-U) tanpa berhenti.",
  "guitar-3": "Mainkan irama 3/4 (bass–genjreng–genjreng) dengan akord G, Em, C, D.",
  "guitar-4": "Bedakan bait (palm mute, lembut) dan reff (terbuka, kuat) di tempo yang stabil.",
  "guitar-5": "Mainkan slash chord G/B, D/F#, C/E dan iringi satu lagu utuh tanpa putus.",
  "guitar-6": "Pakai bentuk worship modern (jari 3 & 4 mengunci) dan transposisi cepat dengan capo.",
  "guitar-7": "Buat suasana doa: volume swell + delay dotted-eighth yang sinkron dengan tempo.",
  "guitar-8": "Genjreng 16th stabil di 120+ BPM dengan aksen 'chak' di ketukan 2 & 4.",
  "guitar-9": "Mainkan hook intro dan fills yang mengisi celah vokal, bukan menimpanya.",
  "guitar-10": "Pimpin dinamika lagu dari bisik ke klimaks dan lakukan modulasi naik 1 nada.",
  // BASS
  "bass-1": "Petik bergantian jari I–M dengan rest stroke dan hafal nada di senar E & A.",
  "bass-2": "Mainkan tangga nada mayor 1 oktaf dengan muting bersih.",
  "bass-3": "Tahan nada panjang (legato) di 3/4 dan 4/4, ganti nada tepat di ketukan 1.",
  "bass-4": "Jatuhkan petikan tepat di klik metronom (in the pocket), termasuk sinkopasi.",
  "bass-5": "Mainkan nada setelah garis miring (G/B, C/E) dan iringi satu lagu utuh.",
  "bass-6": "Hubungkan akord dengan nada lewat (walk-up / walk-down) secukupnya.",
  "bass-7": "Kunci petikan bersama kick drum di 120+ BPM, tambah ghost note & oktaf.",
  "bass-8": "Mainkan interval 10th, slide manis, dan jaga low-end tetap bersih.",
  "bass-9": "Baca chart angka Nashville dan pindah kunci hanya dengan menggeser bentuk.",
  "bass-10": "Tahu kapan diam (tacet) dan kapan masuk, tanpa bertabrakan dengan tangan kiri piano.",
  // PIANO
  "piano-1": "Duduk benar, kenali Middle C, dan tekan triad C, F, G serempak.",
  "piano-2": "Mainkan akord minor dan inversi supaya tangan kanan bergerak minimal.",
  "piano-3": "Mainkan arpeggio 1-5-8 tangan kiri di irama 3/4 sambil kanan mengisi lembut.",
  "piano-4": "Pakai sustain pedal bersih: angkat saat akord berganti, injak lagi segera.",
  "piano-5": "Mainkan slash chord (bass di tangan kiri) dan iringi satu lagu utuh.",
  "piano-6": "Ganti triad rapat dengan voicing terbuka (sus2, sus4, add9) yang lebar & bersih.",
  "piano-7": "Comping staccato di off-beat 120+ BPM dengan grace note gospel.",
  "piano-8": "Padukan piano + pad lembut dan atur sentuhan halus untuk momen doa.",
  "piano-9": "Naikkan nada dasar lewat akord V (Vsus) dan sambung dua lagu tanpa jeda.",
  "piano-10": "Buat intro yang jelas, bunyikan cue note vokal, dan iringi doa dengan peka.",
  // CAJON
  "cajon-1": "Duduk benar dan bedakan jelas bunyi Bass (tengah) vs Slap (atas).",
  "cajon-2": "Mainkan pola ballad 4/4 dengan ghost note yang jauh lebih lembut dari aksen.",
  "cajon-3": "Mainkan pola 3/4 Duum–Tak–Tak yang khidmat untuk hymn.",
  "cajon-4": "Jaga tempo stabil 3 menit penuh tanpa lari (rushing) walau dinamika naik.",
  "cajon-5": "Buat fill-in 1 bar sebagai aba-aba reff, lalu kembali tepat di ketukan 1.",
  "cajon-6": "Mainkan 16-beat 120+ BPM dengan pergelangan rileks dan foot tambourine di 2 & 4.",
  "cajon-7": "Kontrol dinamika bisik ke ledakan dengan crescendo roll yang rapi.",
  "cajon-8": "Mainkan 6/8 slow worship: Bass di hitungan 1, Slap di hitungan 4.",
  "cajon-9": "Isi fill pendek hanya saat vokal bernapas; beri aksen di transisi reff.",
  "cajon-10": "Jadi 'metronom hidup' tim: jaga tempo saat band goyang dan melambat mulus (ritardando).",
};

/** Rutinitas harian 10 menit (di luar jam kelas) — cara latihan yang dipakai kursus profesional. */
export const DAILY_ROUTINES: Record<string, { title: string; steps: string[] }> = {
  guitar: {
    title: "Rutinitas Harian Gitar · 10 Menit",
    steps: [
      "2 menit · Pemanasan: senam jari 1-2-3-4 di tempo pelan.",
      "4 menit · Perpindahan akord: 4 akord pertemuan ini, 1 bar per akord, tanpa berhenti.",
      "3 menit · Strumming: pola pertemuan ini bersama metronom (naik 4 BPM bila 4× bersih berturut-turut).",
      "1 menit · Satu bagian lagu rujukan.",
    ],
  },
  bass: {
    title: "Rutinitas Harian Bass · 10 Menit",
    steps: [
      "2 menit · Pemanasan: petik I–M pada senar terbuka, volume rata.",
      "4 menit · Nada target pertemuan ini sambil mematikan senar lain (muting).",
      "3 menit · Groove bersama metronom: fokus jatuh tepat di klik.",
      "1 menit · Satu bagian lagu rujukan.",
    ],
  },
  piano: {
    title: "Rutinitas Harian Piano · 10 Menit",
    steps: [
      "2 menit · Pemanasan: tangga nada C mayor satu tangan bergantian.",
      "4 menit · Akord pertemuan ini: tangan kiri bass + tangan kanan akord, ganti tiap bar.",
      "3 menit · Pedal & dinamika bersama metronom pelan.",
      "1 menit · Satu bagian lagu rujukan.",
    ],
  },
  cajon: {
    title: "Rutinitas Harian Cajon · 10 Menit",
    steps: [
      "2 menit · Pemanasan: Bass dan Slap bergantian, bedakan bunyinya.",
      "4 menit · Pola pertemuan ini perlahan, lalu naikkan tempo bertahap.",
      "3 menit · Dinamika: ulangi pola dari sangat pelan ke keras tanpa mengubah tempo.",
      "1 menit · Satu bagian lagu rujukan.",
    ],
  },
};
