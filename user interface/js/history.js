// Sample history data (in a real app, this would come from a backend)
const historyData = [
    {
        id: 1,
        type: 'contacted',
        title: 'Mountain Bike - Giant ATX',
        description: 'Contacted seller via WhatsApp',
        contact: '+975 17123456',
        date: '2 hours ago',
        timestamp: new Date('2025-10-02T12:00:00')
    },
    {
        id: 2,
        type: 'viewed',
        title: 'iPhone 12 Pro - 128GB',
        description: 'Viewed product details',
        date: '5 hours ago',
        timestamp: new Date('2025-10-02T09:00:00')
    },
    {
        id: 3,
        type: 'contacted',
        title: 'Gaming Laptop - ASUS ROG',
        description: 'Contacted seller via Phone',
        contact: '+975 77998877',
        date: '1 day ago',
        timestamp: new Date('2025-10-01T14:00:00')
    },
    {
        id: 4,
        type: 'viewed',
        title: 'Leather Sofa Set',
        description: 'Viewed product details',
        date: '2 days ago',
        timestamp: new Date('2025-09-30T16:00:00')
    },
    {
        id: 5,
        type: 'contacted',
        title: 'Canon EOS 80D Camera',
        description: 'Contacted seller via Email',
        contact: 'seller@email.com',
        date: '3 days ago',
        timestamp: new Date('2025-09-29T10:00:00')
    },
    {
        id: 6,
        type: 'viewed',
        title: 'Dining Table - Wooden',
        description: 'Viewed product details',
        date: '4 days ago',
        timestamp: new Date('2025-09-28T11:00:00')
    }
];

// Filter functionality
let currentFilter = 'all';

function renderHistory(filter = 'all') {
    const timeline = document.getElementById('historyTimeline');
    const emptyState = document.getElementById('emptyState');
    
    let filteredData = historyData;
    
    if (filter === 'viewed') {
        filteredData = historyData.filter(item => item.type === 'viewed');
    } else if (filter === 'contacted') {
        filteredData = historyData.filter(item => item.type === 'contacted');
    }
    
    if (filteredData.length === 0) {
        timeline.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    timeline.style.display = 'block';
    emptyState.style.display = 'none';
    
    timeline.innerHTML = filteredData.map(item => `
        <div class="history-item" data-type="${item.type}">
            <div class="history-icon ${item.type}">
                <i class="bi ${item.type === 'viewed' ? 'bi-eye' : 'bi-telephone'}"></i>
            </div>
            <div class="history-content">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                ${item.contact ? `
                    <span class="contact-badge">
                        <i class="bi bi-${item.contact.includes('@') ? 'envelope' : item.contact.startsWith('+') ? 'whatsapp' : 'telephone'}"></i>
                        ${item.contact}
                    </span>
                ` : ''}
                <div class="history-meta">
                    <span><i class="bi bi-clock"></i> ${item.date}</span>
                    ${item.type === 'contacted' ? '<span><i class="bi bi-check-circle"></i> Can leave feedback</span>' : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// Tab filter functionality
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        currentFilter = filter;
        renderHistory(filter);
    });
});

// Initialize history on page load
document.addEventListener('DOMContentLoaded', function() {
    renderHistory();
    
    // Show welcome message
    Swal.fire({
        icon: 'info',
        title: 'Your Activity History',
        text: 'Track all your viewed items and seller contacts here!',
        confirmButtonColor: '#667eea',
        timer: 3000,
        timerProgressBar: true
    });
});