document.addEventListener('DOMContentLoaded', function () {

    let form = document.getElementById('contact-form-modal');

    // opening the modal
    document.getElementById('contact').addEventListener('click', function () {
        form.classList.add('is-active');
    });

    // closing the modal
    document.getElementById('close-modal').addEventListener('click', function () {
        form.classList.remove('is-active');
    });

    // close the modal if opened and the esc button was pressed
    document.addEventListener('keydown', function (evt) {
        if (evt.key === "Escape" || evt.key === "Esc") {
            form.classList.remove('is-active');
        }
    });

    // let pastEventsURL = 'https://api.meetup.com/Glasgow-New-Technology-Meetup/events?desc=true&photo-host=public&sig_id=258287963&status=past&sig=8b70295893afcb37d02915385ab3890d1068e4dd';
    // let upcomingEventsURL = 'https://api.meetup.com/Glasgow-New-Technology-Meetup/events?photo-host=public&sig_id=258287963&status=upcoming&sig=2adcde9e8641287e665bd60681b5d6a10c0f0833';
    //
    // function setEvents(events, type) {
    //     let list;
    //     // type of 0 is past events
    //     if (type === 0) {
    //         list = document.getElementById('past-list');
    //     } else {
    //         list = document.getElementById('upcoming-list');
    //     }
    //     // if length is 0, then no events and we display a small text to check back. this really only applies to upcoming events
    //     if (events.length === 0) {
    //         let text = document.createElement('p');
    //         text.classList.add('has-text-centered-mobile', 'has-text-weight-light', 'is-size-5');
    //         text.appendChild(document.createTextNode('Stay tuned!'));
    //         list.appendChild(text);
    //     } else {
    //         for (let pos in events) {
    //             // current strucutre of element is this: <p><a></a></p>
    //             let event = document.createElement('p');
    //             let link = document.createElement('a');
    //             link.href = events[pos]['link'];
    //             link.appendChild(document.createTextNode(events[pos]['name']));
    //             event.appendChild(link);
    //             event.classList.add('has-text-centered-mobile', 'has-text-weight-light', 'is-size-5');
    //             event.appendChild(document.createElement('br'));
    //             event.appendChild(document.createTextNode(events[pos]['local_date']));
    //             list.appendChild(event);
    //             list.appendChild(document.createElement('br'));
    //         }
    //     }
    // }
    //
    // // set the upcoming events
    // window.upcomingcallback = function (data) {
    //     setEvents(data.data, 1);
    // };
    // let upcomingScript = document.createElement('script');
    // upcomingScript.setAttribute('src', upcomingEventsURL + '&callback=upcomingcallback');
    // document.body.appendChild(upcomingScript);
    //
    // // set the past events
    // window.pastcallback = function (data) {
    //     setEvents(data.data, 0);
    // };
    // let pastScript = document.createElement('script');
    // pastScript.setAttribute('src', pastEventsURL + '&callback=pastcallback');
    // document.body.appendChild(pastScript);


    // get the slider
    let slider = document.getElementById("slider");

    // current slider position
    let sliderPos = 0;

    // get the children of the slider
    let children = slider.children;

    // the total amount of images/children
    let maxImgs = children.length;

    setInterval(function () {
        // reference to the current image before it gets changed
        let currentImg = sliderPos.valueOf();

        // increment the slider position and return it to the start as necessary
        if ((sliderPos + 1) === maxImgs) {
            sliderPos = 0;
        } else {
            sliderPos++;
        }

        children[currentImg].classList.add('is-hidden');
        children[sliderPos].classList.remove('is-hidden');

    }, 3500);

}, false);
