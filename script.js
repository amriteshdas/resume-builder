const form = document.getElementById("resumeForm");
const resumePreview = document.getElementById("resumePreview");
const downloadBtn = document.getElementById("downloadBtn");
const resetBtn = document.getElementById("resetBtn");

const experienceDiv = document.getElementById("experience");
const projectsDiv = document.getElementById("projects");
const educationDiv = document.getElementById("education");
const customSectionsDiv = document.getElementById("customSections");

document.getElementById("addexperience").addEventListener("click", () => {
    const wrapper = document.createElement("div");
    wrapper.className = "experience-entry";
    wrapper.innerHTML = `
      <input type="text" placeholder="Title" class="experience-title">
      <textarea placeholder="Description" class="experience-desc"></textarea>
    `;
    experienceDiv.appendChild(wrapper);
  });

document.getElementById("addProject").addEventListener("click", () => {
  const wrapper = document.createElement("div");
  wrapper.className = "project-entry";
  wrapper.innerHTML = `
    <input type="text" placeholder="Project Title" class="project-title">
    <textarea placeholder="Project Description" class="project-desc"></textarea>
  `;
  projectsDiv.appendChild(wrapper);
});

document.getElementById("addEducation").addEventListener("click", () => {
  const wrapper = document.createElement("div");
  wrapper.className = "education-entry";
  wrapper.innerHTML = `
    <input type="text" placeholder="College Name" class="edu-college">
    <input type="text" placeholder="Stream" class="edu-stream">
    <input type="text" placeholder="Start Year" class="edu-start">
    <input type="text" placeholder="End Year" class="edu-end">
  `;
  educationDiv.appendChild(wrapper);
});

document.getElementById("addCustomSection").addEventListener("click", () => {
  const wrapper = document.createElement("div");
  wrapper.className = "custom-section-entry";
  wrapper.innerHTML = `
    <input type="text" placeholder="Section Title" class="custom-title">
    <textarea placeholder="Section Content" class="custom-content"></textarea>
  `;
  customSectionsDiv.appendChild(wrapper);
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Basic details
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const location = document.getElementById("location").value.trim();
  const portfolio = document.getElementById("portfolio").value.trim();
  const skills = document.getElementById("skills").value.trim();
  const extra = document.getElementById("extra").value.trim();

  // Education
  const eduColleges = document.querySelectorAll(".edu-college");
  const eduStreams = document.querySelectorAll(".edu-stream");
  const eduStarts = document.querySelectorAll(".edu-start");
  const eduEnds = document.querySelectorAll(".edu-end");

  let educationHTML = "";
  for (let i = 0; i < eduColleges.length; i++) {
    if (eduColleges[i].value.trim()) {
      educationHTML += `
        <p><strong>${eduColleges[i].value}</strong><br>
        ${eduStreams[i].value} | ${eduStarts[i].value} - ${eduEnds[i].value}</p>
      `;
    }
  }

    // experience
    const experienceTitles = document.querySelectorAll(".experience-title");
    const experienceDescs = document.querySelectorAll(".experience-desc");
  
    let experienceHTML = "";
    for (let i = 0; i < experienceTitles.length; i++) {
      if (experienceTitles[i].value.trim()) {
        experienceHTML += `
          <p><strong>${experienceTitles[i].value}</strong><br>
          ${experienceDescs[i].value}</p>
        `;
      }
    }

  // Projects
  const projectTitles = document.querySelectorAll(".project-title");
  const projectDescs = document.querySelectorAll(".project-desc");

  let projectsHTML = "";
  for (let i = 0; i < projectTitles.length; i++) {
    if (projectTitles[i].value.trim()) {
      projectsHTML += `
        <h4>${projectTitles[i].value}</h4>
        <p>${projectDescs[i].value}</p>
      `;
    }
  }

  // Custom Sections
  const customTitles = document.querySelectorAll(".custom-title");
  const customContents = document.querySelectorAll(".custom-content");

  let customHTML = "";
  for (let i = 0; i < customTitles.length; i++) {
    if (customTitles[i].value.trim()) {
      customHTML += `
        <h3>${customTitles[i].value}</h3>
        <p>${customContents[i].value}</p>
      `;
    }
  }

  // Resume HTML structure
  let resumeHTML = `
    <div style="width: 794px; min-height: 1123px; padding: 40px; box-sizing: border-box;">
      <h2>${name}</h2>
      <p>📧${email} | 📞${phone} | 📍${location}</p>
      <hr>
  `;

  if (educationHTML) {
    resumeHTML += `<h3>EDUCATION</h3>${educationHTML}`;
  }

  if (experienceHTML) {
    resumeHTML += `<h3>EXPERIENCE</h3>${experienceHTML}`;
  }

  if (portfolio) {
    resumeHTML += `<h3>PORTFOLIO</h3><p><a href="${portfolio}" target="_blank">${portfolio}</a></p>`;
  }

  if (projectsHTML) {
    resumeHTML += `<h3>PROJECTS</h3>${projectsHTML}`;
  }

  if (skills) {
    resumeHTML += `<h3>SKILLS</h3><p>${skills}</p>`;
  }

  if (extra) {
    resumeHTML += `<h3>EXTRA CURRICULAR ACTIVITIES</h3><p>${extra}</p>`;
  }

  if (customHTML) {
    resumeHTML += customHTML;
  }

  resumeHTML += `</div>`;

  resumePreview.innerHTML = resumeHTML;
  resumePreview.style.display = "block";
  downloadBtn.style.display = "block";
});

// Download as PNG (A4)
downloadBtn.addEventListener("click", () => {
    // Scroll to top just in case
    window.scrollTo(0, 0);
  
    // Force a redraw of the resume container (important for html2canvas)
    resumePreview.style.transform = "scale(1)";
    resumePreview.style.opacity = "1";
  
    setTimeout(() => {
      html2canvas(resumePreview, {
        scale: 2,                   // Higher quality
        useCORS: true,
        allowTaint: true,
        scrollY: -window.scrollY,
        backgroundColor: '#ffffff',
      }).then(canvas => {
        const link = document.createElement("a");
        link.download = "resume.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    }, 500); // Wait to ensure DOM is ready
});
  
  

// Reset All
resetBtn.addEventListener("click", () => {
  form.reset();
  document.querySelectorAll(".project-entry, .education-entry, .custom-section-entry").forEach(e => e.remove());
  resumePreview.innerHTML = "";
  resumePreview.style.display = "none";
  downloadBtn.style.display = "none";
});
