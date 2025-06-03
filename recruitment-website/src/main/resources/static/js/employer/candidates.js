document.addEventListener('DOMContentLoaded', function() {
    // Initialize candidate data
    const initialCandidates = [
        {
            id: 1,
            name: 'Nguyễn Văn A',
            email: 'nguyenvana@example.com',
            cv: 'cv/nguyenvana.pdf',
            position: 'Senior Software Engineer',
            status: 'pending'
        },
        {
            id: 2,
            name: 'Trần Thị B',
            email: 'tranthib@example.com',
            cv: 'cv/tranthib.pdf',
            position: 'UX/UI Designer',
            status: 'interview'
        },
        {
            id: 3,
            name: 'Lê Văn C',
            email: 'levanc@example.com',
            cv: 'cv/levanc.pdf',
            position: 'Lập trình viên Frontend',
            status: 'accepted'
        }
    ];

    // Load candidates from localStorage or use initial data
    let candidates = JSON.parse(localStorage.getItem('candidates') || JSON.stringify(initialCandidates));
    localStorage.setItem('candidates', JSON.stringify(candidates));

    // Filter candidates
    const filterInput = document.getElementById('candidate-filter');
    const statusFilter = document.getElementById('status-filter');
    const tableRows = document.querySelectorAll('.table-row');

    function filterCandidates() {
        const searchTerm = filterInput.value.toLowerCase();
        const statusTerm = statusFilter.value;

        tableRows.forEach(row => {
            const name = row.children[0].textContent.toLowerCase();
            const position = row.children[3].textContent.toLowerCase();
            const status = row.children[4].querySelector('select').value;

            const matchesSearch = name.includes(searchTerm) || position.includes(searchTerm);
            const matchesStatus = statusTerm === '' || status === statusTerm;

            row.style.display = matchesSearch && matchesStatus ? '' : 'none';
        });
    }

    filterInput.addEventListener('input', filterCandidates);
    statusFilter.addEventListener('change', filterCandidates);

    // Update candidate status
    const statusSelects = document.querySelectorAll('.status-select');
    statusSelects.forEach(select => {
        select.addEventListener('change', function() {
            const candidateId = this.dataset.candidateId;
            const newStatus = this.value;

            candidates = candidates.map(candidate => {
                if (candidate.id == candidateId) {
                    return { ...candidate, status: newStatus };
                }
                return candidate;
            });

            localStorage.setItem('candidates', JSON.stringify(candidates));
        });
    });
});