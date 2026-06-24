// ==================================================
// RVC DNS Lookup
// ==================================================

async function lookupDNS() {

    const domain =
        document.getElementById("domain").value.trim();

    const type =
        document.getElementById("recordType").value;

    const result =
        document.getElementById("result");

    // Validação básica

    if (!domain) {

        result.textContent =
            "Informe um domínio para consulta.";

        return;
    }

    const domainRegex =
        /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

    if (!domainRegex.test(domain)) {

        result.textContent =
            "Domínio inválido.";

        return;
    }

    // Status

    result.textContent =
        "Consultando registros DNS...";

    try {

        const startTime =
            performance.now();

        const response =
            await fetch(
                `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=${type}`
            );

        const endTime =
            performance.now();

        const elapsed =
            Math.round(endTime - startTime);

        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );
        }

        const data =
            await response.json();

        let output = "";

        output +=
            "====================================\n";

        output +=
            "RVC DNS Lookup\n";

        output +=
            "====================================\n\n";

        output +=
            `Domínio : ${domain}\n`;

        output +=
            `Tipo    : ${type}\n`;

        output +=
            `Tempo   : ${elapsed} ms\n\n`;

        // Respostas

        if (data.Answer && data.Answer.length > 0) {

            output +=
                "Resposta Encontrada\n\n";

            data.Answer.forEach((item, index) => {

                output +=
                    `[${index + 1}] ${item.data}\n`;

            });

        } else {

            output +=
                "Nenhum registro encontrado.\n";

        }

        output +=
            "\n------------------------------------\n";

        output +=
            "JSON Completo\n";

        output +=
            "------------------------------------\n\n";

        output +=
            JSON.stringify(data, null, 2);

        result.textContent =
            output;

    }
    catch (error) {

        result.textContent =
            `Erro ao consultar DNS:\n\n${error.message}`;

        console.error(error);
    }
}

// ==================================================
// ENTER PARA CONSULTAR
// ==================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const domain =
            document.getElementById("domain");

        if (domain) {

            domain.addEventListener(
                "keypress",
                function (event) {

                    if (event.key === "Enter") {

                        lookupDNS();

                    }

                }
            );

        }

    }
);
