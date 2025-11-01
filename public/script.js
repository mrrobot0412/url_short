// Load recent links from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
    loadRecentLinks();
});

// Handle Enter key in input field
document.getElementById('urlInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        shortenUrl();
    }
});

async function shortenUrl() {
    const urlInput = document.getElementById('urlInput');
    const url = urlInput.value.trim();
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    
    // Hide previous results
    resultDiv.classList.add('hidden');
    errorDiv.classList.add('hidden');
    
    // Validate URL
    if (!url) {
        showError('Please enter a URL');
        return;
    }
    
    // Basic URL validation
    if (!isValidUrl(url)) {
        showError('Please enter a valid URL (must include http:// or https://)');
        return;
    }
    
    // Show loading state
    const button = document.getElementById('shortenBtn');
    const originalText = button.textContent;
    button.textContent = 'Shortening...';
    button.disabled = true;
    
    try {
        const response = await fetch('/url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: url })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Display result
            const shortUrl = `${window.location.origin}/${data.id}`;
            document.getElementById('shortUrl').value = shortUrl;
            document.getElementById('originalUrl').textContent = data.redirectUrl;
            document.getElementById('originalUrl').href = data.redirectUrl;
            resultDiv.classList.remove('hidden');
            
            // Save to recent links
            saveToRecentLinks(data.id, data.redirectUrl);
            loadRecentLinks();
            
            // Clear input
            urlInput.value = '';
        } else {
            showError(data.error || 'Failed to create short URL');
        }
    } catch (error) {
        console.error('Error:', error);
        showError('Network error. Please try again.');
    } finally {
        button.textContent = originalText;
        button.disabled = false;
    }
}

function copyToClipboard() {
    const shortUrlInput = document.getElementById('shortUrl');
    const copyBtn = document.getElementById('copyText');
    
    shortUrlInput.select();
    document.execCommand('copy');
    
    // Visual feedback
    copyBtn.textContent = 'Copied!';
    const btn = copyBtn.parentElement;
    btn.classList.add('copied');
    
    setTimeout(() => {
        copyBtn.textContent = 'Copy';
        btn.classList.remove('copied');
    }, 2000);
}

function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
}

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        // If URL doesn't start with http:// or https://, add it and try again
        if (!string.startsWith('http://') && !string.startsWith('https://')) {
            return false;
        }
        return false;
    }
}

function saveToRecentLinks(shortId, originalUrl) {
    let links = JSON.parse(localStorage.getItem('recentLinks') || '[]');
    
    // Remove if already exists
    links = links.filter(link => link.shortId !== shortId);
    
    // Add to beginning
    links.unshift({
        shortId: shortId,
        originalUrl: originalUrl,
        timestamp: Date.now()
    });
    
    // Keep only last 10 links
    links = links.slice(0, 10);
    
    localStorage.setItem('recentLinks', JSON.stringify(links));
}

function loadRecentLinks() {
    const links = JSON.parse(localStorage.getItem('recentLinks') || '[]');
    const container = document.getElementById('recentLinks');
    
    if (links.length === 0) {
        container.innerHTML = '<p class="empty-state">No recent links yet</p>';
        return;
    }
    
    container.innerHTML = links.map(link => {
        const shortUrl = `${window.location.origin}/${link.shortId}`;
        return `
            <div class="link-item">
                <div class="link-info">
                    <div class="link-short">${shortUrl}</div>
                    <div class="link-original">${link.originalUrl}</div>
                </div>
                <div class="link-actions">
                    <button class="link-btn copy-link-btn" onclick="copyLink('${shortUrl}')">
                        Copy
                    </button>
                    <button class="link-btn visit-link-btn" onclick="visitLink('${shortUrl}')">
                        Visit
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function copyLink(url) {
    const textarea = document.createElement('textarea');
    textarea.value = url;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    
    // Show a brief feedback
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.classList.add('copied');
    
    setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('copied');
    }, 1000);
}

function visitLink(url) {
    window.open(url, '_blank');
}

