let cart = [
    { id: 1, price: 549, qty: 2 },
    { id: 2, price: 870, qty: 1 },
    { id: 3, price: 349, qty: 1 }
];

function updateUI(itemId) {
    const item = cart.find(i => i.id === itemId);
    const row = document.querySelector(`.item-row[data-id="${itemId}"]`);

    if (!item || !row) return;

    row.querySelector('.quantity').innerText = item.qty;
    row.querySelector('.total').innerText = item.qty * item.price;
}


document.querySelectorAll('.qty button').forEach(btn => {
    btn.addEventListener('click', () => {
        const row = btn.closest('.item-row');
        const id = Number(row.dataset.id);
        const change = Number(btn.dataset.change);

        const item = cart.find(i => i.id === id);
        if (item.qty + change >= 1) {
            item.qty += change;
            updateUI(id);
        }
    });
});


document.querySelectorAll('.remove').forEach(btn => {
    btn.addEventListener('click', () => {
        const row = btn.closest('.item-row');
        const id = Number(row.dataset.id);

        cart = cart.filter(i => i.id !== id);
        row.remove();
    });
});
