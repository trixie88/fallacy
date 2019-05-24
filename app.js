$(document).ready(function () {
    let mainContent = document.getElementById("mainContent")
    $.ajax({
        type: "GET",
        url: "mainContent.html",
        dataType: 'html',
        async: true,
        success: (data) => {
            mainContent.innerHTML = data;
        },
        error: () => {
            console.log("eror");
        }
    });

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});




// let statisticsBtn = document.getElementById("statistics");
// statisticsBtn.addEventListener("click", () => {
//     $.ajax({
//         type: "GET",
//         url: "jokerStatistics.html",
//         dataType: 'html',
//         async: true,
//         success: (data) => {
//             console.log(data);
//             mainContent.innerHTML = data;
//         },
//         error: () => {
//             console.log("eror");
//         }
//     });
// });