function nearestToZero(arr) {
  if (arr.length === 0) return 0;

  // Ambil nilai pertama sebagai nilai terdekat awal
  let nearest = arr[0];

  // Looping array untuk menemukan nilai terdekat dengan nol
  arr.forEach((current) => {
    if (
      Math.abs(current) < Math.abs(nearest) ||
      (Math.abs(current) === Math.abs(nearest) && current > nearest)
    ) {
      nearest = current;
    }
  });

  return Math.abs(nearest); // Mengembalikan nilai terdekat (positif jika ada dua nilai yang sama-sama dekat dengan nol)
}

// Contoh penggunaan:
console.log(nearestToZero([-7, 10, 19, 24]));
console.log(nearestToZero([-10, 10, 3, -3]));
console.log(nearestToZero([7, -7, 0, -0]));
console.log(nearestToZero([-1, 1, -2, 2]));
console.log(nearestToZero([-7, -2, 2, -1]));
