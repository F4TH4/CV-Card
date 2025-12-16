// ---------------
// Generate CV Preview
// ---------------
function generateCV() {
  const name = document.getElementById('name').value || 'Your Name';
  const about = document.getElementById('about').value || '';
  const experience = document.getElementById('experience').value || '';
  const education = document.getElementById('education').value || '';
  const skills = document.getElementById('skills').value || '';
  const contact = document.getElementById('contact').value || '';

  const skillsList = skills.split(',').map(s => `<li>${s.trim()}</li>`).join('');

  const htmlContent = `
    <div class="header" style="background:#4D96FF;color:white;text-align:center;padding:20px;border-radius:15px 15px 0 0;">
      <h1>${name}</h1>
    </div>
    ${about ? `<div class="section"><h2>About Me</h2><div class="section-content"><p>${about}</p></div></div>` : ''}
    ${experience ? `<div class="section"><h2>Experience</h2><div class="section-content"><p>${experience}</p></div></div>` : ''}
    ${education ? `<div class="section"><h2>Education</h2><div class="section-content"><p>${education}</p></div></div>` : ''}
    ${skills ? `<div class="section"><h2>Skills</h2><ul class="section-content">${skillsList}</ul></div>` : ''}
    ${contact ? `<div class="section"><h2>Contact</h2><div class="section-content"><p>${contact}</p></div></div>` : ''}
  `;

  const preview = document.getElementById('cvPreview');
  preview.innerHTML = htmlContent;

  // Event listener toggle section
  const sections = preview.querySelectorAll('.section');
  sections.forEach(sec => {
    sec.addEventListener('click', () => {
      sections.forEach(s => { if(s !== sec) s.classList.remove('active'); });
      sec.classList.toggle('active');
    });
  });
}

// ---------------
// Download CV HTML
// ---------------
function downloadCV() {
  const cvHTML = document.getElementById('cvPreview').innerHTML;
  const fullHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>My CV</title>
<style>
body { font-family: Arial; margin:20px; background:#f5f5f5; }
.header { background:#4D96FF; color:white; text-align:center; padding:20px; border-radius:15px 15px 0 0; }
h1 { margin:0; }
.section { padding:15px 0; border-bottom:1px solid #eee; cursor:pointer; transition:0.3s; }
.section:hover { background:#f0f8ff; }
.section h2 { margin:0; font-size:20px; color:#333; }
.section-content { display:none; margin-top:10px; font-size:16px; color:#555; }
.active .section-content { display:block; animation: fadeIn 0.5s ease; }
@keyframes fadeIn { from {opacity:0; transform:translateY(10px);} to {opacity:1; transform:translateY(0);} }
</style>
</head>
<body>
  ${cvHTML}
  <script>
    const sections = document.querySelectorAll('.section');
    sections.forEach(sec => {
      sec.addEventListener('click', () => {
        sections.forEach(s => { if(s !== sec) s.classList.remove('active'); });
        sec.classList.toggle('active');
      });
    });
  </script>
</body>
</html>
`;

  const blob = new Blob([fullHTML], { type:'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'my-interactive-cv.html';
  link.click();
  URL.revokeObjectURL(url);
}
