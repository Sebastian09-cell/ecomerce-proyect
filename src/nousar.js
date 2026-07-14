function addTask(tasks, newTask) {
  // 1. Buscá si ya existe una tarea con el mismo id que newTask.id
  //    Pista: usa el mismo método que usaste para "existing" en el carrito
  const existing = tasks.find((task) => task.id === newTask.id);

  if (existing) {
    // 2. Ya existe -> devolvé un array nuevo donde ESA tarea tenga count + 1
    //    Pista: recorré tasks con map, y cuando el id coincida,
    //    devolvé una copia de esa tarea con count aumentado
    return tasks.map((task) =>
      task.id === newTask.id ? { ...task, count: task.count + 1 } : task,
    );
  } else {
    // 3. No existe -> devolvé un array nuevo con todas las tareas anteriores
    //    MÁS la nueva tarea, con count: 1
    return [...tasks, { ...newTask, count: 1 }];
  }
}
// Equivalente a removeFromCart
function removeTask(tasks, id) {
  // Devolvé un array nuevo SIN la tarea que tenga ese id
  // Pista: el método que "deja pasar" solo lo que cumple la condición
  return tasks.filter((task) => task.id !== id);
}

// Equivalente a updateQuantity
function updateCount(tasks, id, delta) {
  // 1. Recorré tasks con map: si el id coincide, sumale/restale delta al count
  //    Si no coincide, dejala igual
  // 2. Después de eso, filtrá y sacá las que quedaron con count <= 0
  return tasks
    .map((task) =>
      task.id === id ? { ...task, count: task.count + delta } : task,
    )
    .filter((task) => task.count > 0);
}

function addfavorite(favorites, movie) {
  const existing = favorites.find((pelicula) => pelicula.id === movie.id);

  if (existing) {
    return favorites;
  } else {
    return [...favorites, { ...movie }];
  }
}

function removeFavorite(favorites, id) {
  return favorites.filter((mirar) => mirar.id !== id);
}

function updateRating(favorites: Movie[], id: number, newRating: number): Movie[] {
  return favorites.map((favorite) =>
    favorite.id === id ? { ...favorite, rating: newRating } : favorite,
  );
}

function getAverageRating(favorites : Movie[]): number {
  const total = favorites.reduce((acc, item) => acc + item.rating, 0);
  const promedio = total / favorites.length;
  return promedio;
}

function addProduct(inventory: Product[], product: Product): Product[] {
  const existing = inventory.find((inv) => inv.id === product.id);

  if (existing) {
    return inventory.map((inv) =>
      inv.id === product.id
        ? { ...inv, stock: inv.stock + product.stock }
        : inv,
    );
  } else {
    return [...inventory, { ...product }];
  }
}
function removeProduct(inventory : Product[], id: number): Product[] {
  return inventory.filter((inv) => inv.id !== id);
}

function sellUnits(inventory: Product[], id: number, amount: number): Product[] {
  return inventory
    .map((inv) => (inv.id === id ? { ...inv, stock: inv.stock - amount } : inv))
    .filter((inv) => inv.stock > 0);
}

function getTotalStock(inventory: Product[]):  number{
  return inventory.reduce((acc, item) => acc + item.stock, 0);
}
