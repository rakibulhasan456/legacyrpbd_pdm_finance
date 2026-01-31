const users = {
  test: { password: "test", name: "Attorney Name"},
    tanmoy: { password: "Tanmoy1887", name: "Gil Colson"},
    zeke: { password: "962546Zeke", name: "Zeke Sen"},
    atif: { password: "blacklegit4040", name: "Atif Ayan"},
    caspian_drake: { password: "notgaycaspian", name: "Caspian Drake"},
    killermax: { password: "Zxcvbnm@123", name: "Johnny Paul"},
    roman: { password: "152515+9510", name: "Roman Sikder"},
    himura: { password: "Himura12", name: "Himura Nagi"}
};

loginBtn.onclick = () => {
  const u = username.value, p = password.value;
  if (users[u] && users[u].password === p) {
    loggedAs.textContent = users[u].name;
    pvLawyer.textContent = users[u].name;
    pvLawyerSig.textContent = users[u].name;
    loginPanel.classList.add("hidden");
    formPanel.classList.remove("hidden");
  } else alert("Invalid credentials");
};

logoutBtn.onclick = () => location.reload();

updatePreview.onclick = () => {
  pvBuyerName.textContent = buyerName.value;
  pvBuyerCid.textContent = buyerCid.value;
  pvBuyerContact.textContent = buyerContact.value;
  pvBuyerAddress.textContent = buyerAddress.value;

  pvVehicleName.textContent = vehicleName.value;
  pvVehiclePlate.textContent = vehiclePlate.value;
  pvVehicleId.textContent = vehicleId.value;
  pvFinanceDuration.textContent = financeDuration.value + " Weeks";

  pvVehiclePrice.textContent = formatMoney(vehiclePrice.value);
    
    pvDownPaymentPercent.textContent = downPaymentPercent.value;
    pvLastInstallmentPaidDate.textContent =
  formatDate(lastInstallmentPaidDate.value);

pvLastInstallmentPaidAmount.textContent =
  formatMoney(lastInstallmentPaidAmount.value);

pvTotalInstallmentPaid.textContent = formatMoney(totalInstallmentPaid.value);

  pvDownPayment.textContent = formatMoney(downPayment.value);
  pvRemainingPayment.textContent = formatMoney(remainingPayment.value);
  pvLastPaymentDate.textContent = formatDate(lastPaymentDate.value || calculateLastDate());

    
    pvFinanceWeeks.textContent = financeDuration.value;


  pvBuyerSig.textContent = buyerName.value;

pvPdmDate.textContent = formatDate(agreementDate.value);
pvLawyerDate.textContent = formatDate(agreementDate.value);
pvBuyerDate.textContent = formatDate(agreementDate.value);
};

downloadPNG.onclick = () => {
  const clone = statementContainer.cloneNode(true);
  clone.style.transform = "none";
  clone.style.position = "fixed";
  clone.style.left = "-99999px";
  document.body.appendChild(clone);

  html2canvas(clone, { scale: 0.6, backgroundColor: "#fff" }).then(c => {
    const a = document.createElement("a");
    a.download = "Vehicle_Finance_Agreement.png";
    a.href = c.toDataURL();
    a.click();
    document.body.removeChild(clone);
  });
};

function formatDate(v) {
  if (!v) return "";
  const d = new Date(v);
  return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
}

function formatMoney(v) {
  return Number(v || 0).toLocaleString("en-US");
}

document.addEventListener("wheel", function (e) {
  if (document.activeElement && document.activeElement.type === "number") {
    document.activeElement.blur();
  }
});


function calculateLastDate() {
  const agreement = agreementDate.value;
  const weeks = parseInt(financeDuration.value);

  if (!agreement || !weeks) return "";

  const d = new Date(agreement);
  const days = weeks === 4 ? 28 : 42;   // 4 weeks = 28 days, 6 weeks = 42 days
  d.setDate(d.getDate() + days);

  // update input field (so user also sees it)
  const iso = d.toISOString().split("T")[0];
  lastPaymentDate.value = iso;

  return iso;
}

agreementDate.addEventListener("change", calculateLastDate);
financeDuration.addEventListener("change", calculateLastDate);

function updateDownPaymentPercent() {
  const weeks = parseInt(financeDuration.value);
  if (!weeks) return;

  downPaymentPercent.value = weeks === 4 ? "25%" : "35%";
}

financeDuration.addEventListener("change", updateDownPaymentPercent);

updateDownPaymentPercent();
