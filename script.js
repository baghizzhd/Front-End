// Data penjualan dan pembelian perusahaan
var salesData = {
    monthly: [500, 800, 700, 900, 600, 400, 300, 500, 600, 800, 700, 900],
    yearly: [6000, 7200, 8400, 9600, 10800, 12000]
  };
  
  var purchaseData = {
    monthly: [400, 700, 600, 800, 500, 300, 200, 400, 500, 700, 600, 800],
    yearly: [4800, 6000, 7200, 8400, 9600, 10800]
  };
  
  var ctx = document.getElementById('sales-purchase-chart').getContext('2d');
  var chart;
  
  function createChart(data) {
    if (chart) {
      chart.destroy(); // Hapus chart yang ada sebelumnya
    }
  
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: getLabels(),
        datasets: [
          {
            label: 'Penjualan',
            data: data.sales,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          },
          {
            label: 'Pembelian',
            data: data.purchases,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
  function getLabels() {
    var period = document.getElementById('period').value;
    if (period === 'monthly') {
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    } else {
      return ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6'];
    }
  }
  
  document.getElementById('period').addEventListener('change', function() {
    var period = this.value;
    if (period === 'monthly') {
      createChart({
        sales: salesData.monthly,
        purchases: purchaseData.monthly
      });
    } else {
      createChart({
        sales: salesData.yearly,
        purchases: purchaseData.yearly
      });
    }
  });
  
  // Inisialisasi grafik
  createChart({
    sales: salesData.monthly,
    purchases: purchaseData.monthly
  });


  document.getElementById('add-row').addEventListener('click', function() {
    var table = document.getElementById('transaction-table');
    var row = table.insertRow(table.rows.length - 1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
  
    cell1.innerHTML = '<input type="text" name="inventory[]" required>';
    cell2.innerHTML = '<input type="text" name="description[]" required>';
    cell3.innerHTML = '<input type="number" class="quantity" name="quantity[]" min="1" required>';
    cell4.innerHTML = '<input type="number" class="price" name="price[]" min="0" required>';
    cell5.innerHTML = '<input type="number" name="discount[]" min="0" required>';
    cell6.innerHTML = '<input type="number" name="subtotal[]" readonly>';
    cell7.innerHTML = '<button type="button" class="delete-row">Delete</button>';
  
    updateSubtotals();
  });
  
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-row')) {
      var row = event.target.parentNode.parentNode;
      row.parentNode.removeChild(row);
      updateSubtotals();
    }
  });
  
  document.addEventListener('input', function(event) {
    if (event.target.classList.contains('quantity') || event.target.classList.contains('price') || event.target.classList.contains('discount')) {
      updateSubtotals();
    }
  });
  
  function updateSubtotals() {
    var quantityInputs = document.getElementsByName('quantity[]');
    var priceInputs = document.getElementsByName('price[]');
    var discountInputs = document.getElementsByName('discount[]');
    var subtotalInputs = document.getElementsByName('subtotal[]');
  
    for (var i = 0; i < quantityInputs.length; i++) {
      var quantity = parseFloat(quantityInputs[i].value) || 0;
      var price = parseFloat(priceInputs[i].value) || 0;
      var discount = parseFloat(discountInputs[i].value) || 0;
      var subtotal = (quantity * price) - discount;
      subtotalInputs[i].value = subtotal.toFixed(2);
    }
  }
  
  // Initial calculation of subtotals
  updateSubtotals();
  
  document.getElementById('transaction-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Lakukan pengiriman data transaksi ke backend atau lakukan tindakan lainnya
    alert('Data transaksi berhasil dikirim!');
  });
  