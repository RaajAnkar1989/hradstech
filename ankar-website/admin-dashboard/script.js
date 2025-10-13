// script.js
db.collection("subscriptions").onSnapshot(snapshot => {
    const table = document.getElementById("userTable");
    table.innerHTML = "";
  
    snapshot.forEach(doc => {
      const data = doc.data();
      const tr = document.createElement("tr");
  
      tr.innerHTML = `
        <td>${doc.id}</td>
        <td>${data.shopName}</td>
        <td>${data.email}</td>
        <td>${data.isActive ? "✅ Active" : "❌ Expired"}</td>
        <td>${data.subscriptionEnd.toDate().toISOString().slice(0, 10)}</td>
        <td>
          <button onclick="updateStatus('${doc.id}', true)">Activate</button>
          <button onclick="updateStatus('${doc.id}', false)">Deactivate</button>
          <button onclick="extend('${doc.id}', 30)">Extend +30d</button>
        </td>
      `;
  
      table.appendChild(tr);
    });
  });
  
  function updateStatus(uid, status) {
    db.collection("subscriptions").doc(uid).update({ isActive: status });
  }
  
  function extend(uid, days) {
    db.collection("subscriptions").doc(uid).get().then(doc => {
      const oldDate = doc.data().subscriptionEnd.toDate();
      const newDate = new Date(oldDate.getTime() + days * 24 * 60 * 60 * 1000);
      db.collection("subscriptions").doc(uid).update({
        subscriptionEnd: firebase.firestore.Timestamp.fromDate(newDate),
        isActive: true
      });
    });
  }