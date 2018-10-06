import Vue from "vue";

// Filters
Vue.filter('striphtml', function (value) {
    var div = document.createElement("div");
    div.innerHTML = value;
    var text = div.textContent || div.innerText || "";
    return text;
});

Vue.filter("text", (value, tekst, path) => {
    // console.log(tekst, path)
    if (tekst.length > 200 && path == "/arkiv") {
        return tekst.substring(0, 199) + " ...";
    } else if (
        tekst.length > 200 &&
        path === "/"
    ) {
        return tekst.substring(0, 199) + " ...";
    } else if (tekst.length > 500 && path !== "/") {
        return tekst.substring(0, 499) + " ...";

    }
    return tekst;
})

Vue.filter("menu", kategori => {
    if (kategori === "baad") return "BÅDE"
    else if (kategori === "bike") return "BIKE'S"
    else return "BILER"
})

Vue.filter("kategori", (kategori) => {
    if (kategori === "baad") return "Båd"
    else if (kategori === "bike") return "Bike"
    else return "Bil"
})

Vue.filter("overskrift", (value, overskrift, path) => {
    console.log(overskrift, path)
    if (path !== "/") return overskrift
    else {
        return overskrift.substring(0, 27) + " ...";
    }
})

Vue.filter("dato", (oprettet) => {
    let dato = oprettet;
    let time = dato.split("T")[1].split(":");
    time = `${time[0]}:${time[1]}`;
    let month = dato
        .split("T")[0]
        .split("-")
        .reverse();

    switch (month[1]) {
        case "01":
            month[1] = "JANUAR";
            break;
        case "02":
            month[1] = "FEBRUAR";
            break;
        case "03":
            month[1] = "MARTS";
            break;
        case "04":
            month[1] = "APRIL";
            break;
        case "05":
            month[1] = "MAJ";
            break;
        case "06":
            month[1] = "JUNI";
            break;
        case "07":
            month[1] = "JULI";
            break;
        case "08":
            month[1] = "AUGUST";
            break;
        case "09":
            month[1] = "SEPTEMPER";
            break;
        case "10":
            month[1] = "OKTOBER";
            break;
        case "11":
            month[1] = "NOVEMBER";
            break;
        case "12":
            month[1] = "DECEMBER";
            break;
        default:
    }
    return `${month[0]}. ${month[1]} ${month[2]} KL. ${time}`;
})