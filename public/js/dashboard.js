// Dashboard javasvript code base for vandalall
let display = new DisplayStuffs();

function showLogout(){
	//Toggle the logout button when the profile buttton has been clicked
	let logoutBody = document.querySelector('#logout');
	display.displayFlexStuff(logoutBody);
	if(logoutBody.classList.contains('showLogout')){
		display.hideStuff(logoutBody);
		logoutBody.classList.remove('showLogout');
	}
	else{
		display.displayFlexStuff(logoutBody);
		logoutBody.classList.add('showLogout');
	}
}

function showMobileMenu(){
	let dashboardMenu = document.querySelector('#dashboardMenu');
	let overlay = document.querySelector('.overlay');
	if(dashboardMenu.classList.contains('dashboardMenuHide')){
		dashboardMenu.classList.remove('dashboardMenuHide');
		dashboardMenu.classList.add('dashboardMenuDisplay');
		// display.displayStuff(overlay);
	}else{
		dashboardMenu.classList.remove('dashboardMenuDisplay');
		dashboardMenu.classList.add('dashboardMenuHide');
	}
}

function closeScheduler(){
	let schedulerBody = document.querySelector('#scheduleAppointmentBody');
	let overlay = document.querySelector('.overlay');
	display.hideStuff(schedulerBody);
	display.hideStuff(overlay);
}

// open payment portal
function openPayment(){
	let appointment = document.querySelector('#appointmentPart');
	let payment = document.querySelector('#paymentPart');
	appointment.style.display = "none";
	payment.style.display = "block";
}

// Open appointment

function openAppointment(){
	let appointment = document.querySelector('#appointmentPart');
	let payment = document.querySelector('#paymentPart');
	appointment.style.display = "block";
	payment.style.display = "none";
}

//Wait for the Dom to load before doing anything else
document.addEventListener('DOMContentLoaded', () => {
	$(document).ready(function(){ //Initia;ize materialize css for forms
	    $('select').formSelect();
	});

	//Indicate which if the menus are active and which is not
	let sideMenus = document.querySelectorAll(".dashboardMenuOption");
	sideMenus.forEach(menu => {
		menu.addEventListener('click', () => {
			Array.from(sideMenus).map(menu => menu.classList.remove('activeMenu'));
			menu.classList.add('activeMenu');
		})
	})

	// Open the scheduler
	let schedulerBtn = document.querySelector('#addAppointmentButton');
	schedulerBtn.addEventListener('click', () => {
		let schedulerBody = document.querySelector('#scheduleAppointmentBody');
		let overlay = document.querySelector('.overlay');
		display.displayFlexStuff(schedulerBody);
		display.displayStuff(overlay);
	})

	//Draw a pie chart showing some statistics
	function drawPieChart(){
		let ctx = document.querySelector('#survey').getContext('2d');
		let data = {
		    datasets: [{
		        data: [2, 1],
		        label: "Appointments Survey",
                // borderColor: '#4169e1',
                backgroundColor: ["#4caf50", "rgb(223, 28, 28)"],
		    }],

		    // These labels appear in the legend and in the tooltips when hovering different arcs
		    labels: [
		        'Attended',
		        'Missed'
		    ]
		};
		var myPieChart = new Chart(ctx, {
		    type: 'doughnut',
		    data: data,
		    options: {}
		});
	}
	drawPieChart();
});


const API_publicKey = "FLWPUBK-ed722a351cbac366452d36cd099affda-X";

function payWithRave() {
    var x = getpaidSetup({
        PBFPubKey: API_publicKey,
        customer_email: "gbahdeybohbello@gmail.com",
        amount: 500,
        customer_phone: "2348133282428",
        currency: "NGN",
        txref: "rave-123456",
        meta: [{
            metaname: "flightID",
            metavalue: "AP1234"
        }],
        onclose: function() {},
        callback: function(response) {
            var txref = response.tx.txRef; // collect txRef returned and pass to a 					server page to complete status check.
            console.log("This is the response returned after a charge", response);
            if (
                response.tx.chargeResponseCode == "00" ||
                response.tx.chargeResponseCode == "0"
            ) {
                // redirect to a success page
            } else {
                // redirect to a failure page.
            }

            x.close(); // use this to close the modal immediately after payment.
        }
    });
}