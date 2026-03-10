const techData = [
    { id: "t1", name: "React", category: "frontend" },
    { id: "t2", name: "Node.js", category: "backend" },
    { id: "t3", name: "Vue.js", category: "frontend" },
    { id: "t4", name: "Python", category: "backend" },
    { id: "t5", name: "PostgreSQL", category: "backend" },
    { id: "t6", name: "Svelte", category: "frontend" }
];

const inventory = document.getElementById("inventory-list");
const zones = document.querySelectorAll(".drop-zone");
const modal = document.getElementById("error-modal");
const modalMsg = document.getElementById("modal-message");
const closeBtn = document.getElementById("modal-close");

techData.sort(() => Math.random() - 0.5);

techData.forEach(function(item) {
    const chip = document.createElement("div");
    chip.className = "tech-chip";
    chip.draggable = true;
    chip.id = item.id;
    chip.innerText = item.name;
    chip.dataset.answer = item.category;

    chip.addEventListener("dragstart", function(e) {
        e.target.classList.add("dragging");
        e.dataTransfer.setData("text", e.target.id);
    });

    chip.addEventListener("dragend", function(e) {
        e.target.classList.remove("dragging");
    });

    inventory.appendChild(chip);
});

zones.forEach(function(zone) {
    zone.addEventListener("dragover", function(e) {
        e.preventDefault();
        zone.classList.add("drag-over");
    });

    zone.addEventListener("dragleave", function(e) {
        zone.classList.remove("drag-over");
    });

    zone.addEventListener("drop", function(e) {
        e.preventDefault();
        zone.classList.remove("drag-over");

        const chipId = e.dataTransfer.getData("text");
        const draggedChip = document.getElementById(chipId);
        const chipAnswer = draggedChip.dataset.answer;
        const zoneCat = zone.getAttribute("data-category");

        if (chipAnswer === zoneCat) {
            const content = zone.querySelector(".zone-content");
            content.appendChild(draggedChip);
            draggedChip.classList.add("correct-drop");
            draggedChip.draggable = false;

            const remaining = inventory.querySelectorAll(".tech-chip").length;
            if (remaining === 0) {
                setTimeout(function() {
                    modalMsg.innerHTML = "🎉 Level Complete! You sorted them all.";
                    closeBtn.innerText = "Play Again";
                    closeBtn.onclick = function() { location.reload(); };
                    modal.classList.add("show");
                }, 300);
            }
        } else {
            modalMsg.innerHTML = `<span style="font-weight:bold; color:#ef4444">${draggedChip.innerText}</span> belongs elsewhere!`;
            modal.classList.add("show");
        }
    });
});

closeBtn.addEventListener("click", function() {
    modal.classList.remove("show");
});
