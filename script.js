async function lookupDNS() {

    const domain =
        document.getElementById("domain").value.trim();

    const type =
        document.getElementById("recordType").value;

    const result =
        document.getElementById("result");

    if(!domain){

        result.textContent =
            "Informe um domínio válido.";

        return;
    }

    result.textContent =
        "Consultando...";

    try{

        const response =
            await fetch(
            `https://dns.google/resolve?name=${domain}&type=${type}`
            );

        const data =
            await response.json();

        result.textContent =
            JSON.stringify(data,null,2);

    }
    catch(error){

        result.textContent =
            "Erro ao consultar DNS.";
    }
}
