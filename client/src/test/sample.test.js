import axios from 'axios';
import { getApprovedEvents, getEvents, getNoEvents, getdeclineEvents, getReserchesEvents } from '../components/actions/eventPosts';
import { getconference, getEditorconference, getAdminconference } from '../components/actions/conference';

test('to check  r Approved event get   api call methods', () => {
    const test1 = getApprovedEvents();
    expect(test1).not.toBeNull();
});

test('to check read all main events methods', () => {
    const test1 = getEvents();
    expect(test1).toBe('Successfully get all main events details');
});

test('to check get all decline main event api call  methods', () => {
    const test1 = getdeclineEvents();
    expect(test1).not.toBeNull();
});

test('to check get Research paper descussion  main events api call  methods', () => {
    const test1 = getReserchesEvents();
    expect(test1).toBe('Successfully got all research main events details');
});

test('to check get approvel pennding   main events api call  methods', () => {
    const test1 = getNoEvents();
    expect(test1).toBe('Successfully get approval pending main  events details');
});

test('to check admin manage conferences object gettinh is null', () => {
    const test1 = getconference();
    expect(test1).not.toBeNull();
});


test('to check editor manage conferences object gettinh is null', () => {
    const test1 = getEditorconference();
    expect(test1).not.toBeNull();
});


test('to check editor manage and approvel no  conferences object gettinh is null', () => {
    const test1 = getAdminconference();
    expect(test1).not.toBeNull();
});



test('to check get all participents', () => {
    axios.get("http://localhost:8070/payment/getparticipents").then((res) => {
        expect(res).not.toBeNull();
    })
});


test('to check get all payments', () => {
    axios.get("http://localhost:8070/payment/allpayments").then((res) => {
        expect(res).not.toBeNull();
    })
});



test('to check get research papers', () => {
    axios.get("http://localhost:8070/getAll").then((res) => {
        expect(res).not.toBeNull();
    })
});


test('to check get all research papers', () => {
    axios.get("http://localhost:8070/review/getResearchPapers").then((res) => {
        expect(res).not.toBeNull();
    })
});


test('to check get all workshops', () => {
    axios.get("http://localhost:8070/workshops/").then((res) => {
        expect(res).not.toBeNull();

    })
});



test('to check get relevant research paper', () => {
    axios.get("http://localhost:8070/review/getResearchPaper").then((res) => {
        expect(res).not.toBeNull();
    })
});


test('to check get relevant workshop', () => {
    axios.get("http://localhost:8070/review/getWorkshop").then((res) => {
        expect(res).not.toBeNull();
    })
});



test('to check get all workshops', () => {
    axios.get("http://localhost:8070/workshops/").then((res) => {
        expect(res).not.toBeNull();
    })
});


test('to check get last added item', () => {
    axios.get("http://localhost:8070/workshops/lastItem ").then((res) => {
        expect(res).not.toBeNull();
    })
})


test('to check get a workshop by id', () => {
    axios.get('http://localhost:8070/workshops/change/${props.match.params.id}').then((res) => {
        expect(res).not.toBeNull();
    })

})



