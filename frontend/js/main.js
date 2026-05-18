// SellYou Frontend JavaScript
// This file handles frontend interactions

// API endpoint (change this to match your backend)
const API_BASE = 'http://localhost:3001';

// Test if the API is running
async function testAPI() {
    try {
        const response = await fetch(`${API_BASE}/api/health`);
        const data = await response.json();
        console.log('✅ API is running:', data);
    } catch (error) {
        console.error('❌ Could not connect to API:', error);
    }
}

// Search for freelancers
async function searchFreelancers(query) {
    try {
        console.log('Searching for:', query);
        // TODO: Implement actual search when backend is ready
        console.log('Search feature coming soon!');
    } catch (error) {
        console.error('Search error:', error);
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 SellYou Frontend Loaded');
    testAPI();

    // Search button handler
    const searchBtn = document.querySelector('.search .btn-primary');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const searchInput = document.getElementById('searchInput');
            if (searchInput.value) {
                searchFreelancers(searchInput.value);
            }
        });
    }
});
