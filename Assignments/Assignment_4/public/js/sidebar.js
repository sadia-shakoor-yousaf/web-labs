document.addEventListener('DOMContentLoaded', function() {
            const sidebar = document.querySelector('.sidebar');
            const sidebarToggle = document.querySelector('.sidebar-toggle');
            const backdrop = document.querySelector('.sidebar-backdrop');

            sidebarToggle.addEventListener('click', function() {
                sidebar.classList.toggle('show');
                backdrop.style.display = sidebar.classList.contains('show') ? 'block' : 'none';
            });

            backdrop.addEventListener('click', function() {
                sidebar.classList.remove('show');
                backdrop.style.display = 'none';
            });
        });