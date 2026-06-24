async function lookupDNS() {

    const domain = document.getElementById("domain").value;
    const type = document.getElementById("recordType").value;

    const url =
      `https://dns.google/resolve?name=${domain}&type=${type}`;

    const response = await fetch(url);
    const data = await response.json();

    document.getElementById("result").textContent =
        JSON.stringify(data, null, 2);
}
