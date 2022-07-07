var carsStore = new Array();
const carsafterFilter = [];
const filter = {};

$(document).ready(function () {
    $.getJSON('/MarketStore.json', function (data) {
        carsStore = data.carsList;
        setTimeout(() => renderCars(carsStore), 2000);
    })
});

$(document).on('click', function (e) {
    if ($(e.target).hasClass("drop") != true) {
        $(".dropdown-content").removeClass("grid");
        $(".form-select").removeClass("activ-drop-content");
    }
})

function renderCars(arr) {
    $(".loader").hide();
    $('.no-matches').hide();
    $(".search-result").text(`${arr.length} cars`);
    arr.forEach((car, index) => {
        $('.cars-list').append(`
                <div id="car-id-${car.id}" class="car-card">
                    <div class="car-poster">
                        <img src="../images/cars/${car.src}" alt="${car.src}"/>
                    </div>
                    <div class="car-info">
                        <div class="d-flex">
                            <div class="release-year"><h6>${car.year}</h6></div>
                            <div class="model-name"><h6>${car.name}</h6></div>
                        </div>
                        <div class="d-flex machine-characteristics">
                            <div class="mileage"><span>${car.mileage}</span></div>
                            <div class="vl-container"><div class="vl"></div></div>
                            <div class="type-of-transmission"><span>${car.transmission}</span></div>
                            <div class="vl-container"><div class="vl"></div></div>
                            <div class="type-of-motor"><span>${car.motor}</span></div>
                        </div>
                        <div class="price"><h5>${car.price}</h5></div>
                    </div>
                </div>
            `);

        if (car.new === "yes") {
            $(`#car-id-${car.id} .car-poster`).append(`<div class="new-car">New</div>`)
        }
        if (car.sold === "yes") {
            $(`#car-id-${car.id} .car-poster`).append(`<div class="sold-car"><h2>SOLD</h2></div>`)
        };
    });
};



$(".email-fild").click(() => { $(".email-fild").css("border-color", "#ffffff"), $(".error-message").hide(), $(".cross").hide(), $(".check-mark").hide(); });

$(".send-email").click(() => {
    $(".error-message").hide(), $(".cross").hide(), $(".check-mark").hide();
    const emailFild = $(".email-fild").val();
    const searchEmail = emailFild.split('');

    if (searchEmail.length < 3 && searchEmail.includes('@') === false) {
        $(".error-message").show();
        $(".cross").show();
        $(".email-fild").css("border-color", "#ff2307");
        return
    } else {
        $(".email-fild").css("border-color", "#507A36");
        $(".check-mark").show();
        return
    };
});


$('.accordion-button').click(function () {
    $('.accordion-header').removeClass('active-accordion-button');
    $('.accordion-button').removeClass('active-accordion-btn active-accordion-button-color');

    if ($(this).hasClass("collapsed") === false) {
        $(this).toggleClass('active-accordion-button-color');
        $(this).parent().toggleClass('active-accordion-button');
    };
});

const newSearchArr = [];

$(".form-check-input").click(() => { $(".checkbox-text").toggleClass("brand-color"), $("#car-id-7").toggleClass('display-none') });

$(".select-cars-by-param").click(function () {
    $(".dropdown-content").removeClass("grid");
    $(".select-cars-by-param").removeClass("activ-drop-content");
    $(this).removeClass("brand-color-border");
    $(this.parentElement.children[1]).addClass("grid");
    $(this).addClass("activ-drop-content");
});

$(".select-by-year").click(function (e) {
    $(".dropdown-content").removeClass("grid");
    $(this.parentElement.parentElement).removeClass(" grid");
    $(this.parentElement.parentElement.children[0]).removeClass(" activ-drop-content");

    const chosedParam = (e.target.parentElement.parentElement.children[0].textContent).replace(/\s/g, '');

    const year = chosedParam === 'Year' && filter.year != undefined && filter.year != e.target.innerText ? filter.year = e.target.innerText : filter.year = e.target.innerText;

    cars = carsStore.filter(function (item) {
        for (var key in filter) {
            if (item[key] === undefined || item[key] != filter[key])
                return false;
        } return true;
    });

    if (cars.length > 0) {
        $('.cars-list').html(``);
        $('.no-matches').hide();
        renderCars(cars);
    } else {
        $('.cars-list').html(``);
        $('.no-matches').show();
    };

    e.target.parentElement.parentElement.children[0].textContent = e.target.innerText;
    e.target.parentElement.parentElement.children[0].className += " brand-color-border";
});


$(".select-cars-by-param").click(function () {
    $(".dropdown-content").removeClass("grid");
    $(".select-cars-by-param").removeClass("activ-drop-content");
    $(this).removeClass("brand-color-border");
    $(this.parentElement.children[1]).addClass("grid");
    $(this).addClass("activ-drop-content");
});

$(".select-by-make").click(function (e) {
    $(".dropdown-content").removeClass("grid");
    $(this.parentElement.parentElement).removeClass(" grid");
    $(this.parentElement.parentElement.children[0]).removeClass(" activ-drop-content");

    const chosedParam = (e.target.parentElement.parentElement.children[0].textContent).replace(/\s/g, '');

    const make = chosedParam === 'Make' && filter.model != undefined && filter.model != e.target.innerText ? filter.model = e.target.innerText : filter.model = e.target.innerText;

    cars = carsStore.filter(function (item) {
        for (var key in filter) {
            if (item[key] === undefined || item[key] != filter[key])
                return false;
        } return true;
    });

    if (cars.length > 0) {
        $('.cars-list').html(``);
        $('.no-matches').hide();
        renderCars(cars);
    } else {
        $('.cars-list').html(``);
        $('.no-matches').show();
    };

    e.target.parentElement.parentElement.children[0].textContent = e.target.innerText;
    e.target.parentElement.parentElement.children[0].className += " brand-color-border";
});


$(".select-by-model").click(function (e) {
    $(".dropdown-content").removeClass("grid");
    $(this.parentElement.parentElement).removeClass(" grid");
    $(this.parentElement.parentElement.children[0]).removeClass(" activ-drop-content");

    const chosedParam = (e.target.parentElement.parentElement.children[0].textContent).replace(/\s/g, '');

    const model = chosedParam === 'Make' && filter.transmission != undefined && filter.transmission != e.target.innerText ? filter.transmission = e.target.innerText : filter.transmission = e.target.innerText;

    cars = carsStore.filter(function (item) {
        for (var key in filter) {
            if (item[key] === undefined || item[key] != filter[key])
                return false;
        } return true;
    });

    if (cars.length > 0) {
        $('.cars-list').html(``);
        $('.no-matches').hide();
        renderCars(cars);
    } else {
        $('.cars-list').html(``);
        $('.no-matches').show();
    };

    e.target.parentElement.parentElement.children[0].textContent = e.target.innerText;
    e.target.parentElement.parentElement.children[0].className += " brand-color-border";
});

$(".select-by-trim").click(function (e) {
    $(".dropdown-content").removeClass("grid");
    $(this.parentElement.parentElement).removeClass(" grid");
    $(this.parentElement.parentElement.children[0]).removeClass(" activ-drop-content");

    const chosedParam = (e.target.textContent).replace(/\s/g, '');

    const motor = chosedParam === 'Make' && filter.motor != undefined && filter.motor != e.target.innerText ? filter.motor = e.target.innerText : filter.motor = e.target.innerText;

    cars = carsStore.filter(function (item) {
        for (var key in filter) {
            if (item[key] === undefined || item[key] != filter[key])
                return false;
        } return true;
    });

    if (cars.length > 0) {
        $('.cars-list').html(``);
        $('.no-matches').hide();
        renderCars(cars);
    } else {
        $('.cars-list').html(``);
        $('.no-matches').show();
    };

    e.target.parentElement.parentElement.children[0].textContent = e.target.innerText;
    e.target.parentElement.parentElement.children[0].className += " brand-color-border";
});

$(".select-by-mileage").click(function (e) {
    $(".dropdown-content").removeClass("grid");
    $(this.parentElement.parentElement).removeClass(" grid");
    $(this.parentElement.parentElement.children[0]).removeClass(" activ-drop-content");

    const chosedParam = ((e.target.textContent).replace(/\\n/g, " ")).split(' - ')[0];

    const chosedMileage = filter.mileage != undefined ? filter.mileage = chosedParam : filter.mileage = chosedParam;

    cars = [];

    carsStore.filter(function (item) {
        for (var key in filter) {
            if (item[key] === undefined || item[key] != filter[key])
                if ((parseInt(item[key].split(' km')[0], 10)) > parseInt(filter[key]) === true) {
                    if ((parseInt(item[key].split(' km')[0], 10) < parseInt(filter[key]) + 20) === true) {
                        cars.push(item)
                    }
                    return false;
                }
            return false;
        } return true;
    });

    if (cars.length > 0) {
        $('.cars-list').html(``);
        $('.no-matches').hide();
        renderCars(cars);
    } else {
        $('.cars-list').html(``);
        $('.no-matches').show();
    };

    e.target.parentElement.parentElement.children[0].textContent = e.target.innerText;
    e.target.parentElement.parentElement.children[0].className += " brand-color-border";
});

$("#sort-by-param").change(function () {
    if ($(this).children("option:selected").text() === "Price (ascending)") {
        carsStore.sort(function (a, b) {
            const aPrise = a.price.split('$');
            const bPrise = b.price.split('$');
            return Math.round(100 * parseFloat(aPrise[1])) - Math.round(100 * parseFloat(bPrise[1]));
        });
        $('.cars-list').html(``);
        renderCars(carsStore);
    };

    if ($(this).children("option:selected").text() === "Price (descending)") {
        carsStore.sort(function (a, b) {
            const aPrise = a.price.split('$');
            const bPrise = b.price.split('$');
            return Math.round(100 * parseFloat(bPrise[1])) - Math.round(100 * parseFloat(aPrise[1]));
        });
        $('.cars-list').html(``);
        renderCars(carsStore);
    };

    if ($(this).children("option:selected").text() === "Mileage (ascending)") {
        carsStore.sort(function (a, b) {
            const aPrise = a.mileage.split(' km');
            const bPrise = b.mileage.split(' km');
            return Math.round(100 * parseFloat(aPrise[0])) - Math.round(100 * parseFloat(bPrise[0]));
        });
        $('.cars-list').html(``);
        renderCars(carsStore);
    };

    if ($(this).children("option:selected").text() === "Mileage (descending)") {
        carsStore.sort(function (a, b) {
            const aPrise = a.mileage.split(' km');
            const bPrise = b.mileage.split(' km');
            return Math.round(100 * parseFloat(bPrise[0])) - Math.round(100 * parseFloat(aPrise[0]));
        });
        $('.cars-list').html(``);
        renderCars(carsStore);
    };
});
