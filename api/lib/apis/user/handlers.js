const { Op } = require('sequelize');
const Boom = require('@hapi/boom');
const Wreck = require("@hapi/wreck");
const moment = require('moment');
const now = moment();

module.exports = {
    populate: async (request, h) => {
        const payloads = [
            {
                "bookingReference": "1ZXSSA",
                "offerId": "eb12ffed-0a53-48bd-b1d2-b9375fb72d5a",
                "ticketingAirline": "WZZZ",
                "ticketingAirline1": "THL",
                "passengerType": "CHILD",
                "documentNumber": "YR1965010H",
                "origin": "AXP",
                "origin1": "SLS",
                "destination": "WSA",
                "destination1": "LGA",
                "airlineCode": "RJY",
                "airlineCode1": "QCF",
                "bookingClass": "ECONOMY",
                "bookingClass1": "BUSINESS"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "c1f5627e-a01a-4ec6-8f8a-93ac11aa1994",
                "ticketingAirline": "QCF",
                "ticketingAirline1": "THL",
                "passengerType": "ADULT",
                "documentNumber": "PR4967263C",
                "origin": "SLS",
                "origin1": "CGH",
                "destination": "CDG",
                "destination1": "OKL",
                "airlineCode": "USK",
                "airlineCode1": "AAS",
                "bookingClass": "PREMIUM_ECONOMY",
                "bookingClass1": "ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "c1f5627e-a01a-4ec6-8f8a-93ac11aa1994",
                "ticketingAirline": "NMP",
                "ticketingAirline1": "NMP",
                "passengerType": "ADULT",
                "documentNumber": "OC3173523J",
                "origin": "LGW",
                "origin1": "ORY",
                "destination": "LGW",
                "destination1": "CDG",
                "airlineCode": "AAS",
                "airlineCode1": "CMK",
                "bookingClass": "PREMIUM_ECONOMY",
                "bookingClass1": "PREMIUM_ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "33ec2aa9-1d99-49a6-aaa2-b1627cd0bfd5",
                "ticketingAirline": "AAS",
                "ticketingAirline1": "NMP",
                "passengerType": "ADULT",
                "documentNumber": "YR1965010H",
                "origin": "FCO",
                "origin1": "WSA",
                "destination": "SLS",
                "destination1": "OKL",
                "airlineCode": "CMK",
                "airlineCode1": "RJY",
                "bookingClass": "PREMIUM_ECONOMY",
                "bookingClass1": "FIRST"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "c1f5627e-a01a-4ec6-8f8a-93ac11aa1994",
                "ticketingAirline": "THL",
                "ticketingAirline1": "AAS",
                "passengerType": "ADULT",
                "documentNumber": "PG5895644B",
                "origin": "YSP",
                "origin1": "LGA",
                "destination": "CDG",
                "destination1": "HND",
                "airlineCode": "VML",
                "airlineCode1": "VML",
                "bookingClass": "BUSINESS",
                "bookingClass1": "BUSINESS"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "d25b3ebb-1d1d-4ac3-8d6d-3d58b1f53896",
                "ticketingAirline": "AAS",
                "ticketingAirline1": "VML",
                "passengerType": "CHILD",
                "documentNumber": "OC3173523J",
                "origin": "LHR",
                "origin1": "PMA",
                "destination": "DSN",
                "destination1": "LGA",
                "airlineCode": "THL",
                "airlineCode1": "UCA",
                "bookingClass": "FIRST",
                "bookingClass1": "PREMIUM_ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "d25b3ebb-1d1d-4ac3-8d6d-3d58b1f53896",
                "ticketingAirline": "RJY",
                "ticketingAirline1": "WZZZ",
                "passengerType": "ADULT",
                "documentNumber": "ZH9795302W",
                "origin": "LGA",
                "origin1": "FCO",
                "destination": "CGH",
                "destination1": "JFK",
                "airlineCode": "USK",
                "airlineCode1": "UCA",
                "bookingClass": "PREMIUM_ECONOMY",
                "bookingClass1": "FIRST"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "6120e4ba-4648-4ac0-b0c2-d1a85e93f78d",
                "ticketingAirline": "RJY",
                "ticketingAirline1": "LBK",
                "passengerType": "CHILD",
                "documentNumber": "KJASHDK19827398AKJSH",
                "origin": "MWJ",
                "origin1": "ORY",
                "destination": "LGA",
                "destination1": "PMA",
                "airlineCode": "NMP",
                "airlineCode1": "VML",
                "bookingClass": "FIRST",
                "bookingClass1": "ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "33ec2aa9-1d99-49a6-aaa2-b1627cd0bfd5",
                "ticketingAirline": "RJY",
                "ticketingAirline1": "QCF",
                "passengerType": "ADULT",
                "documentNumber": "YR1965010H",
                "origin": "LGW",
                "origin1": "LGW",
                "destination": "WSA",
                "destination1": "CDG",
                "airlineCode": "THL",
                "airlineCode1": "USK",
                "bookingClass": "FIRST",
                "bookingClass1": "PREMIUM_ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "59ff3a6b-b7e8-4e83-8c87-f098d2fdff53",
                "ticketingAirline": "THL",
                "ticketingAirline1": "AAS",
                "passengerType": "ADULT",
                "documentNumber": "RY6488743Q",
                "origin": "LCM",
                "origin1": "PMA",
                "destination": "HND",
                "destination1": "YSP",
                "airlineCode": "AAS",
                "airlineCode1": "CMK",
                "bookingClass": "PREMIUM_ECONOMY",
                "bookingClass1": "PREMIUM_ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "9d1865bb-8fce-48dc-b34e-bc99148557e7",
                "ticketingAirline": "USK",
                "ticketingAirline1": "WZZZ",
                "passengerType": "ADULT",
                "documentNumber": "RY6488743Q",
                "origin": "PMA",
                "origin1": "BLM",
                "destination": "SLS",
                "destination1": "OKL",
                "airlineCode": "USK",
                "airlineCode1": "CMK",
                "bookingClass": "PREMIUM_ECONOMY",
                "bookingClass1": "BUSINESS"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "6d4fed8e-fe7a-4b97-bc5c-e6c67cde3f92",
                "ticketingAirline": "QCF",
                "ticketingAirline1": "NMP",
                "passengerType": "CHILD",
                "documentNumber": "PR4967263C",
                "origin": "SLS",
                "origin1": "PDT",
                "destination": "HYN",
                "destination1": "MWJ",
                "airlineCode": "VML",
                "airlineCode1": "RJY",
                "bookingClass": "ECONOMY",
                "bookingClass1": "BUSINESS"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "aeafa709-48b6-4c5b-a497-1a57a1ea4229",
                "ticketingAirline": "WZZZ",
                "ticketingAirline1": "VML",
                "passengerType": "ADULT",
                "documentNumber": "CH8087396E",
                "origin": "CDG",
                "origin1": "JFK",
                "destination": "LGW",
                "destination1": "BLM",
                "airlineCode": "QCF",
                "airlineCode1": "THL",
                "bookingClass": "FIRST",
                "bookingClass1": "ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "9d1865bb-8fce-48dc-b34e-bc99148557e7",
                "ticketingAirline": "USK",
                "ticketingAirline1": "AAS",
                "passengerType": "ADULT",
                "documentNumber": "AR0063179Q",
                "origin": "TIA",
                "origin1": "OKL",
                "destination": "CEG",
                "destination1": "LCM",
                "airlineCode": "LBK",
                "airlineCode1": "USK",
                "bookingClass": "FIRST",
                "bookingClass1": "PREMIUM_ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "028880a3-5a73-4df1-a078-96bd104eeecc",
                "ticketingAirline": "WZZZ",
                "ticketingAirline1": "VML",
                "passengerType": "CHILD",
                "documentNumber": "PG5895644B",
                "origin": "BPS",
                "origin1": "OKL",
                "destination": "NRT",
                "destination1": "SLS",
                "airlineCode": "LBK",
                "airlineCode1": "RJY",
                "bookingClass": "FIRST",
                "bookingClass1": "FIRST"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "6d4fed8e-fe7a-4b97-bc5c-e6c67cde3f92",
                "ticketingAirline": "VML",
                "ticketingAirline1": "WZZZ",
                "passengerType": "ADULT",
                "documentNumber": "CH8087396E",
                "origin": "ORY",
                "origin1": "MWJ",
                "destination": "OKL",
                "destination1": "AXP",
                "airlineCode": "WZZZ",
                "airlineCode1": "CMK",
                "bookingClass": "ECONOMY",
                "bookingClass1": "BUSINESS"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "d25b3ebb-1d1d-4ac3-8d6d-3d58b1f53896",
                "ticketingAirline": "USK",
                "ticketingAirline1": "THL",
                "passengerType": "CHILD",
                "documentNumber": "PG8930648H",
                "origin": "BLM",
                "origin1": "BPS",
                "destination": "HHI",
                "destination1": "HYN",
                "airlineCode": "THL",
                "airlineCode1": "UCA",
                "bookingClass": "BUSINESS",
                "bookingClass1": "BUSINESS"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "d25b3ebb-1d1d-4ac3-8d6d-3d58b1f53896",
                "ticketingAirline": "USK",
                "ticketingAirline1": "THL",
                "passengerType": "ADULT",
                "documentNumber": "YR1965010H",
                "origin": "WSA",
                "origin1": "CDG",
                "destination": "LCM",
                "destination1": "LAA",
                "airlineCode": "WZZZ",
                "airlineCode1": "NMP",
                "bookingClass": "FIRST",
                "bookingClass1": "PREMIUM_ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "e02d44ac-fd18-4153-9140-e29be0fd1986",
                "ticketingAirline": "CMK",
                "ticketingAirline1": "LBK",
                "passengerType": "ADULT",
                "documentNumber": "OC3173523J",
                "origin": "TOJ",
                "origin1": "BLM",
                "destination": "JFK",
                "destination1": "WSA",
                "airlineCode": "UCA",
                "airlineCode1": "VML",
                "bookingClass": "ECONOMY",
                "bookingClass1": "FIRST"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "d25b3ebb-1d1d-4ac3-8d6d-3d58b1f53896",
                "ticketingAirline": "WZZZ",
                "ticketingAirline1": "QCF",
                "passengerType": "CHILD",
                "documentNumber": "PG8930648H",
                "origin": "DSN",
                "origin1": "FCO",
                "destination": "PDT",
                "destination1": "BLM",
                "airlineCode": "LBK",
                "airlineCode1": "VML",
                "bookingClass": "ECONOMY",
                "bookingClass1": "PREMIUM_ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "028880a3-5a73-4df1-a078-96bd104eeecc",
                "ticketingAirline": "UCA",
                "ticketingAirline1": "CMK",
                "passengerType": "ADULT",
                "documentNumber": "CH8087396E",
                "origin": "TOJ",
                "origin1": "CGH",
                "destination": "TOJ",
                "destination1": "NRT",
                "airlineCode": "WZZZ",
                "airlineCode1": "USK",
                "bookingClass": "FIRST",
                "bookingClass1": "FIRST"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "6d4fed8e-fe7a-4b97-bc5c-e6c67cde3f92",
                "ticketingAirline": "LBK",
                "ticketingAirline1": "NMP",
                "passengerType": "ADULT",
                "documentNumber": "ZH9795302W",
                "origin": "TIA",
                "origin1": "HHI",
                "destination": "CDG",
                "destination1": "CDG",
                "airlineCode": "UCA",
                "airlineCode1": "USK",
                "bookingClass": "ECONOMY",
                "bookingClass1": "ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "e02d44ac-fd18-4153-9140-e29be0fd1986",
                "ticketingAirline": "RJY",
                "ticketingAirline1": "USK",
                "passengerType": "CHILD",
                "documentNumber": "RY6488743Q",
                "origin": "LHR",
                "origin1": "NRT",
                "destination": "PMA",
                "destination1": "PMA",
                "airlineCode": "QCF",
                "airlineCode1": "RJY",
                "bookingClass": "PREMIUM_ECONOMY",
                "bookingClass1": "FIRST"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "9d1865bb-8fce-48dc-b34e-bc99148557e7",
                "ticketingAirline": "QCF",
                "ticketingAirline1": "RJY",
                "passengerType": "CHILD",
                "documentNumber": "YR1965010H",
                "origin": "WSA",
                "origin1": "CGH",
                "destination": "CEG",
                "destination1": "TOJ",
                "airlineCode": "THL",
                "airlineCode1": "QCF",
                "bookingClass": "BUSINESS",
                "bookingClass1": "PREMIUM_ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "6120e4ba-4648-4ac0-b0c2-d1a85e93f78d",
                "ticketingAirline": "NMP",
                "ticketingAirline1": "AAS",
                "passengerType": "ADULT",
                "documentNumber": "PG8930648H",
                "origin": "TIA",
                "origin1": "WSA",
                "destination": "LAA",
                "destination1": "CGH",
                "airlineCode": "QCF",
                "airlineCode1": "UCA",
                "bookingClass": "BUSINESS",
                "bookingClass1": "BUSINESS"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "f573edd1-45d4-4aff-b1f9-7abe72906d78",
                "ticketingAirline": "USK",
                "ticketingAirline1": "QCF",
                "passengerType": "CHILD",
                "documentNumber": "RY6488743Q",
                "origin": "FCO",
                "origin1": "DSN",
                "destination": "LAA",
                "destination1": "CEG",
                "airlineCode": "VML",
                "airlineCode1": "WZZZ",
                "bookingClass": "ECONOMY",
                "bookingClass1": "BUSINESS"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "f573edd1-45d4-4aff-b1f9-7abe72906d78",
                "ticketingAirline": "WZZZ",
                "ticketingAirline1": "USK",
                "passengerType": "ADULT",
                "documentNumber": "RY6488743Q",
                "origin": "CEG",
                "origin1": "LAA",
                "destination": "AXP",
                "destination1": "CGH",
                "airlineCode": "WZZZ",
                "airlineCode1": "AAS",
                "bookingClass": "FIRST",
                "bookingClass1": "FIRST"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "369cdb3d-8604-4e74-8605-630c8af9f751",
                "ticketingAirline": "QCF",
                "ticketingAirline1": "WZZZ",
                "passengerType": "ADULT",
                "documentNumber": "OC3173523J",
                "origin": "BPS",
                "origin1": "LAA",
                "destination": "HND",
                "destination1": "HHI",
                "airlineCode": "CMK",
                "airlineCode1": "VML",
                "bookingClass": "PREMIUM_ECONOMY",
                "bookingClass1": "BUSINESS"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "9d1865bb-8fce-48dc-b34e-bc99148557e7",
                "ticketingAirline": "QCF",
                "ticketingAirline1": "AAS",
                "passengerType": "CHILD",
                "documentNumber": "YR1965010H",
                "origin": "CDG",
                "origin1": "NRT",
                "destination": "CDG",
                "destination1": "CGH",
                "airlineCode": "QCF",
                "airlineCode1": "WZZZ",
                "bookingClass": "PREMIUM_ECONOMY",
                "bookingClass1": "BUSINESS"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "6120e4ba-4648-4ac0-b0c2-d1a85e93f78d",
                "ticketingAirline": "QCF",
                "ticketingAirline1": "CMK",
                "passengerType": "CHILD",
                "documentNumber": "PG5895644B",
                "origin": "HND",
                "origin1": "WAB",
                "destination": "ORY",
                "destination1": "MWJ",
                "airlineCode": "NMP",
                "airlineCode1": "USK",
                "bookingClass": "ECONOMY",
                "bookingClass1": "FIRST"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "eb12ffed-0a53-48bd-b1d2-b9375fb72d5a",
                "ticketingAirline": "USK",
                "ticketingAirline1": "CMK",
                "passengerType": "CHILD",
                "documentNumber": "KJASHDK19827398AKJSH",
                "origin": "WAB",
                "origin1": "MWJ",
                "destination": "CDG",
                "destination1": "OKL",
                "airlineCode": "RJY",
                "airlineCode1": "WZZZ",
                "bookingClass": "PREMIUM_ECONOMY",
                "bookingClass1": "FIRST"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "59ff3a6b-b7e8-4e83-8c87-f098d2fdff53",
                "ticketingAirline": "THL",
                "ticketingAirline1": "NMP",
                "passengerType": "CHILD",
                "documentNumber": "KJASHDK19827398AKJSH",
                "origin": "HHI",
                "origin1": "HYN",
                "destination": "PMA",
                "destination1": "CEG",
                "airlineCode": "QCF",
                "airlineCode1": "THL",
                "bookingClass": "ECONOMY",
                "bookingClass1": "PREMIUM_ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "6d4fed8e-fe7a-4b97-bc5c-e6c67cde3f92",
                "ticketingAirline": "NMP",
                "ticketingAirline1": "CMK",
                "passengerType": "CHILD",
                "documentNumber": "RY6488743Q",
                "origin": "ORY",
                "origin1": "FCO",
                "destination": "CDG",
                "destination1": "ORY",
                "airlineCode": "THL",
                "airlineCode1": "LBK",
                "bookingClass": "BUSINESS",
                "bookingClass1": "PREMIUM_ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "369cdb3d-8604-4e74-8605-630c8af9f751",
                "ticketingAirline": "NMP",
                "ticketingAirline1": "CMK",
                "passengerType": "CHILD",
                "documentNumber": "OC3173523J",
                "origin": "DSN",
                "origin1": "TOJ",
                "destination": "SLS",
                "destination1": "CEG",
                "airlineCode": "VML",
                "airlineCode1": "USK",
                "bookingClass": "PREMIUM_ECONOMY",
                "bookingClass1": "PREMIUM_ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "6d4fed8e-fe7a-4b97-bc5c-e6c67cde3f92",
                "ticketingAirline": "CMK",
                "ticketingAirline1": "VML",
                "passengerType": "ADULT",
                "documentNumber": "AR0063179Q",
                "origin": "TIA",
                "origin1": "CDG",
                "destination": "SLS",
                "destination1": "LGW",
                "airlineCode": "LBK",
                "airlineCode1": "THL",
                "bookingClass": "FIRST",
                "bookingClass1": "PREMIUM_ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "c1f5627e-a01a-4ec6-8f8a-93ac11aa1994",
                "ticketingAirline": "LBK",
                "ticketingAirline1": "UCA",
                "passengerType": "ADULT",
                "documentNumber": "AR0063179Q",
                "origin": "TIA",
                "origin1": "LCM",
                "destination": "HND",
                "destination1": "PDT",
                "airlineCode": "UCA",
                "airlineCode1": "QCF",
                "bookingClass": "PREMIUM_ECONOMY",
                "bookingClass1": "ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "d25b3ebb-1d1d-4ac3-8d6d-3d58b1f53896",
                "ticketingAirline": "USK",
                "ticketingAirline1": "QCF",
                "passengerType": "ADULT",
                "documentNumber": "RY6488743Q",
                "origin": "LCM",
                "origin1": "PDT",
                "destination": "JFK",
                "destination1": "LCM",
                "airlineCode": "LBK",
                "airlineCode1": "NMP",
                "bookingClass": "ECONOMY",
                "bookingClass1": "ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "7c2f1bba-7140-44d0-9537-83202bc0180c",
                "ticketingAirline": "LBK",
                "ticketingAirline1": "AAS",
                "passengerType": "CHILD",
                "documentNumber": "WO3924880G",
                "origin": "NRT",
                "origin1": "WSA",
                "destination": "JFK",
                "destination1": "DSN",
                "airlineCode": "WZZZ",
                "airlineCode1": "WZZZ",
                "bookingClass": "ECONOMY",
                "bookingClass1": "PREMIUM_ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "e02d44ac-fd18-4153-9140-e29be0fd1986",
                "ticketingAirline": "AAS",
                "ticketingAirline1": "VML",
                "passengerType": "CHILD",
                "documentNumber": "OC3173523J",
                "origin": "PDT",
                "origin1": "CGH",
                "destination": "YSP",
                "destination1": "BLM",
                "airlineCode": "VML",
                "airlineCode1": "QCF",
                "bookingClass": "FIRST",
                "bookingClass1": "PREMIUM_ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "d25b3ebb-1d1d-4ac3-8d6d-3d58b1f53896",
                "ticketingAirline": "NMP",
                "ticketingAirline1": "NMP",
                "passengerType": "CHILD",
                "documentNumber": "AR0063179Q",
                "origin": "TIA",
                "origin1": "YSP",
                "destination": "AXP",
                "destination1": "HND",
                "airlineCode": "AAS",
                "airlineCode1": "UCA",
                "bookingClass": "ECONOMY",
                "bookingClass1": "BUSINESS"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "e02d44ac-fd18-4153-9140-e29be0fd1986",
                "ticketingAirline": "NMP",
                "ticketingAirline1": "AAS",
                "passengerType": "CHILD",
                "documentNumber": "ZH9795302W",
                "origin": "MWJ",
                "origin1": "NRT",
                "destination": "PMA",
                "destination1": "SLS",
                "airlineCode": "RJY",
                "airlineCode1": "QCF",
                "bookingClass": "FIRST",
                "bookingClass1": "ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "9d1865bb-8fce-48dc-b34e-bc99148557e7",
                "ticketingAirline": "VML",
                "ticketingAirline1": "USK",
                "passengerType": "ADULT",
                "documentNumber": "VS2217224A",
                "origin": "YSP",
                "origin1": "ORY",
                "destination": "CDG",
                "destination1": "DSN",
                "airlineCode": "LBK",
                "airlineCode1": "UCA",
                "bookingClass": "FIRST",
                "bookingClass1": "PREMIUM_ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "59ff3a6b-b7e8-4e83-8c87-f098d2fdff53",
                "ticketingAirline": "VML",
                "ticketingAirline1": "THL",
                "passengerType": "ADULT",
                "documentNumber": "ZH9795302W",
                "origin": "WSA",
                "origin1": "PMA",
                "destination": "BPS",
                "destination1": "TOJ",
                "airlineCode": "NMP",
                "airlineCode1": "USK",
                "bookingClass": "BUSINESS",
                "bookingClass1": "ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "6120e4ba-4648-4ac0-b0c2-d1a85e93f78d",
                "ticketingAirline": "WZZZ",
                "ticketingAirline1": "RJY",
                "passengerType": "ADULT",
                "documentNumber": "CH8087396E",
                "origin": "BPS",
                "origin1": "SLS",
                "destination": "WAB",
                "destination1": "LGA",
                "airlineCode": "UCA",
                "airlineCode1": "RJY",
                "bookingClass": "PREMIUM_ECONOMY",
                "bookingClass1": "BUSINESS"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "f573edd1-45d4-4aff-b1f9-7abe72906d78",
                "ticketingAirline": "USK",
                "ticketingAirline1": "VML",
                "passengerType": "ADULT",
                "documentNumber": "KJASHDK19827398AKJSH",
                "origin": "WSA",
                "origin1": "WAB",
                "destination": "ORY",
                "destination1": "AXP",
                "airlineCode": "NMP",
                "airlineCode1": "NMP",
                "bookingClass": "PREMIUM_ECONOMY",
                "bookingClass1": "BUSINESS"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "aeafa709-48b6-4c5b-a497-1a57a1ea4229",
                "ticketingAirline": "THL",
                "ticketingAirline1": "RJY",
                "passengerType": "CHILD",
                "documentNumber": "CH8087396E",
                "origin": "BLM",
                "origin1": "AXP",
                "destination": "CGH",
                "destination1": "MWJ",
                "airlineCode": "UCA",
                "airlineCode1": "LBK",
                "bookingClass": "PREMIUM_ECONOMY",
                "bookingClass1": "BUSINESS"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "e02d44ac-fd18-4153-9140-e29be0fd1986",
                "ticketingAirline": "NMP",
                "ticketingAirline1": "UCA",
                "passengerType": "CHILD",
                "documentNumber": "AR0063179Q",
                "origin": "TIA",
                "origin1": "AXP",
                "destination": "HHI",
                "destination1": "SLS",
                "airlineCode": "AAS",
                "airlineCode1": "AAS",
                "bookingClass": "BUSINESS",
                "bookingClass1": "FIRST"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "028880a3-5a73-4df1-a078-96bd104eeecc",
                "ticketingAirline": "AAS",
                "ticketingAirline1": "VML",
                "passengerType": "ADULT",
                "documentNumber": "OC3173523J",
                "origin": "ORY",
                "origin1": "OKL",
                "destination": "NRT",
                "destination1": "FCO",
                "airlineCode": "NMP",
                "airlineCode1": "RJY",
                "bookingClass": "PREMIUM_ECONOMY",
                "bookingClass1": "FIRST"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "7c2f1bba-7140-44d0-9537-83202bc0180c",
                "ticketingAirline": "WZZZ",
                "ticketingAirline1": "RJY",
                "passengerType": "CHILD",
                "documentNumber": "ZH9795302W",
                "origin": "HHI",
                "origin1": "SLS",
                "destination": "WSA",
                "destination1": "CGH",
                "airlineCode": "VML",
                "airlineCode1": "THL",
                "bookingClass": "ECONOMY",
                "bookingClass1": "PREMIUM_ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "aeafa709-48b6-4c5b-a497-1a57a1ea4229",
                "ticketingAirline": "CMK",
                "ticketingAirline1": "UCA",
                "passengerType": "ADULT",
                "documentNumber": "RY6488743Q",
                "origin": "HHI",
                "origin1": "YSP",
                "destination": "LHR",
                "destination1": "ORY",
                "airlineCode": "AAS",
                "airlineCode1": "THL",
                "bookingClass": "ECONOMY",
                "bookingClass1": "FIRST"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "cd88c168-3f3d-41d6-a474-9e09559b4b7f",
                "ticketingAirline": "RJY",
                "ticketingAirline1": "UCA",
                "passengerType": "ADULT",
                "documentNumber": "CH8087396E",
                "origin": "CEG",
                "origin1": "FCO",
                "destination": "BLM",
                "destination1": "LAA",
                "airlineCode": "USK",
                "airlineCode1": "AAS",
                "bookingClass": "PREMIUM_ECONOMY",
                "bookingClass1": "PREMIUM_ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "eb12ffed-0a53-48bd-b1d2-b9375fb72d5a",
                "ticketingAirline": "LBK",
                "ticketingAirline1": "RJY",
                "passengerType": "ADULT",
                "documentNumber": "VS2217224A",
                "origin": "DSN",
                "origin1": "NRT",
                "destination": "WAB",
                "destination1": "JFK",
                "airlineCode": "QCF",
                "airlineCode1": "NMP",
                "bookingClass": "ECONOMY",
                "bookingClass1": "BUSINESS"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "e02d44ac-fd18-4153-9140-e29be0fd1986",
                "ticketingAirline": "THL",
                "ticketingAirline1": "THL",
                "passengerType": "CHILD",
                "documentNumber": "CH8087396E",
                "origin": "CDG",
                "origin1": "JFK",
                "destination": "TOJ",
                "destination1": "WAB",
                "airlineCode": "NMP",
                "airlineCode1": "AAS",
                "bookingClass": "ECONOMY",
                "bookingClass1": "ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "cd88c168-3f3d-41d6-a474-9e09559b4b7f",
                "ticketingAirline": "VML",
                "ticketingAirline1": "CMK",
                "passengerType": "CHILD",
                "documentNumber": "AR0063179Q",
                "origin": "TIA",
                "origin1": "YSP",
                "destination": "OKL",
                "destination1": "OKL",
                "airlineCode": "WZZZ",
                "airlineCode1": "THL",
                "bookingClass": "ECONOMY",
                "bookingClass1": "BUSINESS"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "369cdb3d-8604-4e74-8605-630c8af9f751",
                "ticketingAirline": "QCF",
                "ticketingAirline1": "NMP",
                "passengerType": "CHILD",
                "documentNumber": "ZH9795302W",
                "origin": "LHR",
                "origin1": "HYN",
                "destination": "HYN",
                "destination1": "PDT",
                "airlineCode": "USK",
                "airlineCode1": "VML",
                "bookingClass": "ECONOMY",
                "bookingClass1": "BUSINESS"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "6120e4ba-4648-4ac0-b0c2-d1a85e93f78d",
                "ticketingAirline": "AAS",
                "ticketingAirline1": "AAS",
                "passengerType": "CHILD",
                "documentNumber": "PG8930648H",
                "origin": "OKL",
                "origin1": "LCM",
                "destination": "ORY",
                "destination1": "CEG",
                "airlineCode": "UCA",
                "airlineCode1": "QCF",
                "bookingClass": "ECONOMY",
                "bookingClass1": "PREMIUM_ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "7c2f1bba-7140-44d0-9537-83202bc0180c",
                "ticketingAirline": "CMK",
                "ticketingAirline1": "QCF",
                "passengerType": "ADULT",
                "documentNumber": "PG8930648H",
                "origin": "CEG",
                "origin1": "HHI",
                "destination": "LGW",
                "destination1": "DSN",
                "airlineCode": "VML",
                "airlineCode1": "NMP",
                "bookingClass": "PREMIUM_ECONOMY",
                "bookingClass1": "ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "369cdb3d-8604-4e74-8605-630c8af9f751",
                "ticketingAirline": "NMP",
                "ticketingAirline1": "CMK",
                "passengerType": "ADULT",
                "documentNumber": "CH8087396E",
                "origin": "ORY",
                "origin1": "PDT",
                "destination": "BLM",
                "destination1": "WSA",
                "airlineCode": "WZZZ",
                "airlineCode1": "NMP",
                "bookingClass": "BUSINESS",
                "bookingClass1": "BUSINESS"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "aeafa709-48b6-4c5b-a497-1a57a1ea4229",
                "ticketingAirline": "NMP",
                "ticketingAirline1": "CMK",
                "passengerType": "ADULT",
                "documentNumber": "KJASHDK19827398AKJSH",
                "origin": "HND",
                "origin1": "WSA",
                "destination": "TIA",
                "destination1": "HYN",
                "airlineCode": "NMP",
                "airlineCode1": "USK",
                "bookingClass": "PREMIUM_ECONOMY",
                "bookingClass1": "PREMIUM_ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "369cdb3d-8604-4e74-8605-630c8af9f751",
                "ticketingAirline": "VML",
                "ticketingAirline1": "QCF",
                "passengerType": "ADULT",
                "documentNumber": "OC3173523J",
                "origin": "WSA",
                "origin1": "BLM",
                "destination": "TIA",
                "destination1": "TOJ",
                "airlineCode": "UCA",
                "airlineCode1": "LBK",
                "bookingClass": "ECONOMY",
                "bookingClass1": "PREMIUM_ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "6120e4ba-4648-4ac0-b0c2-d1a85e93f78d",
                "ticketingAirline": "USK",
                "ticketingAirline1": "AAS",
                "passengerType": "CHILD",
                "documentNumber": "PG8930648H",
                "origin": "LGA",
                "origin1": "BLM",
                "destination": "OKL",
                "destination1": "PMA",
                "airlineCode": "NMP",
                "airlineCode1": "NMP",
                "bookingClass": "ECONOMY",
                "bookingClass1": "ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "f573edd1-45d4-4aff-b1f9-7abe72906d78",
                "ticketingAirline": "VML",
                "ticketingAirline1": "UCA",
                "passengerType": "CHILD",
                "documentNumber": "OC3173523J",
                "origin": "SLS",
                "origin1": "LAA",
                "destination": "MWJ",
                "destination1": "JFK",
                "airlineCode": "LBK",
                "airlineCode1": "LBK",
                "bookingClass": "BUSINESS",
                "bookingClass1": "FIRST"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "cd88c168-3f3d-41d6-a474-9e09559b4b7f",
                "ticketingAirline": "USK",
                "ticketingAirline1": "THL",
                "passengerType": "ADULT",
                "documentNumber": "RY6488743Q",
                "origin": "DSN",
                "origin1": "ORY",
                "destination": "OKL",
                "destination1": "LGA",
                "airlineCode": "CMK",
                "airlineCode1": "VML",
                "bookingClass": "FIRST",
                "bookingClass1": "FIRST"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "aeafa709-48b6-4c5b-a497-1a57a1ea4229",
                "ticketingAirline": "QCF",
                "ticketingAirline1": "QCF",
                "passengerType": "CHILD",
                "documentNumber": "PR4967263C",
                "origin": "ORY",
                "origin1": "WSA",
                "destination": "CGH",
                "destination1": "LGW",
                "airlineCode": "WZZZ",
                "airlineCode1": "USK",
                "bookingClass": "PREMIUM_ECONOMY",
                "bookingClass1": "FIRST"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "59ff3a6b-b7e8-4e83-8c87-f098d2fdff53",
                "ticketingAirline": "LBK",
                "ticketingAirline1": "USK",
                "passengerType": "CHILD",
                "documentNumber": "PR4967263C",
                "origin": "FCO",
                "origin1": "HND",
                "destination": "SLS",
                "destination1": "TOJ",
                "airlineCode": "LBK",
                "airlineCode1": "THL",
                "bookingClass": "PREMIUM_ECONOMY",
                "bookingClass1": "FIRST"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "369cdb3d-8604-4e74-8605-630c8af9f751",
                "ticketingAirline": "RJY",
                "ticketingAirline1": "USK",
                "passengerType": "CHILD",
                "documentNumber": "RY6488743Q",
                "origin": "LHR",
                "origin1": "BPS",
                "destination": "TIA",
                "destination1": "NRT",
                "airlineCode": "WZZZ",
                "airlineCode1": "LBK",
                "bookingClass": "BUSINESS",
                "bookingClass1": "BUSINESS"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "d25b3ebb-1d1d-4ac3-8d6d-3d58b1f53896",
                "ticketingAirline": "NMP",
                "ticketingAirline1": "VML",
                "passengerType": "ADULT",
                "documentNumber": "RY6488743Q",
                "origin": "PDT",
                "origin1": "ORY",
                "destination": "CGH",
                "destination1": "TIA",
                "airlineCode": "RJY",
                "airlineCode1": "THL",
                "bookingClass": "PREMIUM_ECONOMY",
                "bookingClass1": "ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "f573edd1-45d4-4aff-b1f9-7abe72906d78",
                "ticketingAirline": "VML",
                "ticketingAirline1": "RJY",
                "passengerType": "CHILD",
                "documentNumber": "YR1965010H",
                "origin": "TIA",
                "origin1": "FCO",
                "destination": "HYN",
                "destination1": "HND",
                "airlineCode": "QCF",
                "airlineCode1": "AAS",
                "bookingClass": "BUSINESS",
                "bookingClass1": "PREMIUM_ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "9d1865bb-8fce-48dc-b34e-bc99148557e7",
                "ticketingAirline": "UCA",
                "ticketingAirline1": "THL",
                "passengerType": "CHILD",
                "documentNumber": "ZH9795302W",
                "origin": "LGA",
                "origin1": "PMA",
                "destination": "LGW",
                "destination1": "OKL",
                "airlineCode": "VML",
                "airlineCode1": "CMK",
                "bookingClass": "BUSINESS",
                "bookingClass1": "PREMIUM_ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "e02d44ac-fd18-4153-9140-e29be0fd1986",
                "ticketingAirline": "USK",
                "ticketingAirline1": "WZZZ",
                "passengerType": "CHILD",
                "documentNumber": "ZH9795302W",
                "origin": "LAA",
                "origin1": "LCM",
                "destination": "DSN",
                "destination1": "NRT",
                "airlineCode": "QCF",
                "airlineCode1": "CMK",
                "bookingClass": "FIRST",
                "bookingClass1": "PREMIUM_ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "369cdb3d-8604-4e74-8605-630c8af9f751",
                "ticketingAirline": "USK",
                "ticketingAirline1": "VML",
                "passengerType": "CHILD",
                "documentNumber": "PG8930648H",
                "origin": "PDT",
                "origin1": "LGW",
                "destination": "LGA",
                "destination1": "TOJ",
                "airlineCode": "AAS",
                "airlineCode1": "WZZZ",
                "bookingClass": "PREMIUM_ECONOMY",
                "bookingClass1": "PREMIUM_ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "369cdb3d-8604-4e74-8605-630c8af9f751",
                "ticketingAirline": "USK",
                "ticketingAirline1": "UCA",
                "passengerType": "CHILD",
                "documentNumber": "PG8930648H",
                "origin": "LAA",
                "origin1": "CDG",
                "destination": "HND",
                "destination1": "TIA",
                "airlineCode": "VML",
                "airlineCode1": "WZZZ",
                "bookingClass": "ECONOMY",
                "bookingClass1": "ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "cd88c168-3f3d-41d6-a474-9e09559b4b7f",
                "ticketingAirline": "LBK",
                "ticketingAirline1": "CMK",
                "passengerType": "ADULT",
                "documentNumber": "RY6488743Q",
                "origin": "ORY",
                "origin1": "LGW",
                "destination": "HND",
                "destination1": "BLM",
                "airlineCode": "QCF",
                "airlineCode1": "RJY",
                "bookingClass": "FIRST",
                "bookingClass1": "BUSINESS"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "6120e4ba-4648-4ac0-b0c2-d1a85e93f78d",
                "ticketingAirline": "NMP",
                "ticketingAirline1": "UCA",
                "passengerType": "CHILD",
                "documentNumber": "AR0063179Q",
                "origin": "TIA",
                "origin1": "TIA",
                "destination": "CDG",
                "destination1": "JFK",
                "airlineCode": "USK",
                "airlineCode1": "CMK",
                "bookingClass": "BUSINESS",
                "bookingClass1": "FIRST"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "f573edd1-45d4-4aff-b1f9-7abe72906d78",
                "ticketingAirline": "RJY",
                "ticketingAirline1": "WZZZ",
                "passengerType": "CHILD",
                "documentNumber": "PG8930648H",
                "origin": "PDT",
                "origin1": "OKL",
                "destination": "HND",
                "destination1": "CGH",
                "airlineCode": "THL",
                "airlineCode1": "USK",
                "bookingClass": "BUSINESS",
                "bookingClass1": "ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "6120e4ba-4648-4ac0-b0c2-d1a85e93f78d",
                "ticketingAirline": "USK",
                "ticketingAirline1": "WZZZ",
                "passengerType": "CHILD",
                "documentNumber": "ZH9795302W",
                "origin": "LGA",
                "origin1": "FCO",
                "destination": "LCM",
                "destination1": "BLM",
                "airlineCode": "NMP",
                "airlineCode1": "USK",
                "bookingClass": "ECONOMY",
                "bookingClass1": "ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "eb12ffed-0a53-48bd-b1d2-b9375fb72d5a",
                "ticketingAirline": "USK",
                "ticketingAirline1": "NMP",
                "passengerType": "CHILD",
                "documentNumber": "PG8930648H",
                "origin": "NRT",
                "origin1": "TIA",
                "destination": "LCM",
                "destination1": "AXP",
                "airlineCode": "AAS",
                "airlineCode1": "AAS",
                "bookingClass": "PREMIUM_ECONOMY",
                "bookingClass1": "ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "e02d44ac-fd18-4153-9140-e29be0fd1986",
                "ticketingAirline": "NMP",
                "ticketingAirline1": "QCF",
                "passengerType": "ADULT",
                "documentNumber": "OC3173523J",
                "origin": "NRT",
                "origin1": "ORY",
                "destination": "PDT",
                "destination1": "LCM",
                "airlineCode": "NMP",
                "airlineCode1": "THL",
                "bookingClass": "FIRST",
                "bookingClass1": "PREMIUM_ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "d25b3ebb-1d1d-4ac3-8d6d-3d58b1f53896",
                "ticketingAirline": "AAS",
                "ticketingAirline1": "WZZZ",
                "passengerType": "CHILD",
                "documentNumber": "OC3173523J",
                "origin": "LAA",
                "origin1": "CGH",
                "destination": "AXP",
                "destination1": "DSN",
                "airlineCode": "NMP",
                "airlineCode1": "THL",
                "bookingClass": "ECONOMY",
                "bookingClass1": "BUSINESS"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "aeafa709-48b6-4c5b-a497-1a57a1ea4229",
                "ticketingAirline": "THL",
                "ticketingAirline1": "QCF",
                "passengerType": "CHILD",
                "documentNumber": "PG8930648H",
                "origin": "PDT",
                "origin1": "LCM",
                "destination": "OKL",
                "destination1": "MWJ",
                "airlineCode": "THL",
                "airlineCode1": "RJY",
                "bookingClass": "PREMIUM_ECONOMY",
                "bookingClass1": "FIRST"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "eb12ffed-0a53-48bd-b1d2-b9375fb72d5a",
                "ticketingAirline": "THL",
                "ticketingAirline1": "RJY",
                "passengerType": "ADULT",
                "documentNumber": "OC3173523J",
                "origin": "FCO",
                "origin1": "PMA",
                "destination": "PDT",
                "destination1": "AXP",
                "airlineCode": "LBK",
                "airlineCode1": "QCF",
                "bookingClass": "ECONOMY",
                "bookingClass1": "PREMIUM_ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "369cdb3d-8604-4e74-8605-630c8af9f751",
                "ticketingAirline": "VML",
                "ticketingAirline1": "QCF",
                "passengerType": "ADULT",
                "documentNumber": "AR0063179Q",
                "origin": "TIA",
                "origin1": "AXP",
                "destination": "WAB",
                "destination1": "FCO",
                "airlineCode": "LBK",
                "airlineCode1": "NMP",
                "bookingClass": "ECONOMY",
                "bookingClass1": "ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "cd88c168-3f3d-41d6-a474-9e09559b4b7f",
                "ticketingAirline": "CMK",
                "ticketingAirline1": "LBK",
                "passengerType": "CHILD",
                "documentNumber": "ZH9795302W",
                "origin": "CGH",
                "origin1": "BLM",
                "destination": "WAB",
                "destination1": "NRT",
                "airlineCode": "UCA",
                "airlineCode1": "LBK",
                "bookingClass": "BUSINESS",
                "bookingClass1": "BUSINESS"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "cd88c168-3f3d-41d6-a474-9e09559b4b7f",
                "ticketingAirline": "LBK",
                "ticketingAirline1": "UCA",
                "passengerType": "ADULT",
                "documentNumber": "AR0063179Q",
                "origin": "TIA",
                "origin1": "LHR",
                "destination": "BLM",
                "destination1": "TIA",
                "airlineCode": "UCA",
                "airlineCode1": "THL",
                "bookingClass": "ECONOMY",
                "bookingClass1": "PREMIUM_ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "59ff3a6b-b7e8-4e83-8c87-f098d2fdff53",
                "ticketingAirline": "UCA",
                "ticketingAirline1": "RJY",
                "passengerType": "ADULT",
                "documentNumber": "PR4967263C",
                "origin": "LCM",
                "origin1": "LGA",
                "destination": "CGH",
                "destination1": "DSN",
                "airlineCode": "THL",
                "airlineCode1": "USK",
                "bookingClass": "FIRST",
                "bookingClass1": "PREMIUM_ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "6d4fed8e-fe7a-4b97-bc5c-e6c67cde3f92",
                "ticketingAirline": "VML",
                "ticketingAirline1": "RJY",
                "passengerType": "CHILD",
                "documentNumber": "AR0063179Q",
                "origin": "TIA",
                "origin1": "DSN",
                "destination": "ORY",
                "destination1": "WSA",
                "airlineCode": "QCF",
                "airlineCode1": "CMK",
                "bookingClass": "FIRST",
                "bookingClass1": "FIRST"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "6d4fed8e-fe7a-4b97-bc5c-e6c67cde3f92",
                "ticketingAirline": "LBK",
                "ticketingAirline1": "THL",
                "passengerType": "ADULT",
                "documentNumber": "OC3173523J",
                "origin": "CEG",
                "origin1": "CEG",
                "destination": "TOJ",
                "destination1": "DSN",
                "airlineCode": "CMK",
                "airlineCode1": "VML",
                "bookingClass": "FIRST",
                "bookingClass1": "BUSINESS"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "c1f5627e-a01a-4ec6-8f8a-93ac11aa1994",
                "ticketingAirline": "AAS",
                "ticketingAirline1": "CMK",
                "passengerType": "CHILD",
                "documentNumber": "YR1965010H",
                "origin": "YSP",
                "origin1": "CEG",
                "destination": "OKL",
                "destination1": "SLS",
                "airlineCode": "QCF",
                "airlineCode1": "USK",
                "bookingClass": "ECONOMY",
                "bookingClass1": "BUSINESS"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "f573edd1-45d4-4aff-b1f9-7abe72906d78",
                "ticketingAirline": "QCF",
                "ticketingAirline1": "VML",
                "passengerType": "ADULT",
                "documentNumber": "CH8087396E",
                "origin": "HYN",
                "origin1": "PMA",
                "destination": "WSA",
                "destination1": "YSP",
                "airlineCode": "LBK",
                "airlineCode1": "USK",
                "bookingClass": "PREMIUM_ECONOMY",
                "bookingClass1": "PREMIUM_ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "33ec2aa9-1d99-49a6-aaa2-b1627cd0bfd5",
                "ticketingAirline": "NMP",
                "ticketingAirline1": "CMK",
                "passengerType": "CHILD",
                "documentNumber": "KJASHDK19827398AKJSH",
                "origin": "AXP",
                "origin1": "ORY",
                "destination": "LGW",
                "destination1": "LHR",
                "airlineCode": "WZZZ",
                "airlineCode1": "CMK",
                "bookingClass": "BUSINESS",
                "bookingClass1": "ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "e02d44ac-fd18-4153-9140-e29be0fd1986",
                "ticketingAirline": "QCF",
                "ticketingAirline1": "NMP",
                "passengerType": "CHILD",
                "documentNumber": "PG5895644B",
                "origin": "HYN",
                "origin1": "HND",
                "destination": "TIA",
                "destination1": "NRT",
                "airlineCode": "AAS",
                "airlineCode1": "USK",
                "bookingClass": "PREMIUM_ECONOMY",
                "bookingClass1": "PREMIUM_ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "cd88c168-3f3d-41d6-a474-9e09559b4b7f",
                "ticketingAirline": "RJY",
                "ticketingAirline1": "WZZZ",
                "passengerType": "CHILD",
                "documentNumber": "WO3924880G",
                "origin": "SLS",
                "origin1": "HYN",
                "destination": "WAB",
                "destination1": "HND",
                "airlineCode": "CMK",
                "airlineCode1": "UCA",
                "bookingClass": "BUSINESS",
                "bookingClass1": "ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "6d4fed8e-fe7a-4b97-bc5c-e6c67cde3f92",
                "ticketingAirline": "RJY",
                "ticketingAirline1": "THL",
                "passengerType": "ADULT",
                "documentNumber": "YR1965010H",
                "origin": "TOJ",
                "origin1": "NRT",
                "destination": "PDT",
                "destination1": "TOJ",
                "airlineCode": "UCA",
                "airlineCode1": "THL",
                "bookingClass": "PREMIUM_ECONOMY",
                "bookingClass1": "FIRST"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "f573edd1-45d4-4aff-b1f9-7abe72906d78",
                "ticketingAirline": "QCF",
                "ticketingAirline1": "CMK",
                "passengerType": "CHILD",
                "documentNumber": "KJASHDK19827398AKJSH",
                "origin": "LHR",
                "origin1": "CGH",
                "destination": "MWJ",
                "destination1": "HND",
                "airlineCode": "AAS",
                "airlineCode1": "VML",
                "bookingClass": "PREMIUM_ECONOMY",
                "bookingClass1": "FIRST"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "028880a3-5a73-4df1-a078-96bd104eeecc",
                "ticketingAirline": "USK",
                "ticketingAirline1": "USK",
                "passengerType": "ADULT",
                "documentNumber": "AR0063179Q",
                "origin": "TIA",
                "origin1": "HYN",
                "destination": "LCM",
                "destination1": "YSP",
                "airlineCode": "QCF",
                "airlineCode1": "QCF",
                "bookingClass": "PREMIUM_ECONOMY",
                "bookingClass1": "ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "59ff3a6b-b7e8-4e83-8c87-f098d2fdff53",
                "ticketingAirline": "CMK",
                "ticketingAirline1": "WZZZ",
                "passengerType": "ADULT",
                "documentNumber": "YR1965010H",
                "origin": "WAB",
                "origin1": "DSN",
                "destination": "HHI",
                "destination1": "CDG",
                "airlineCode": "RJY",
                "airlineCode1": "CMK",
                "bookingClass": "FIRST",
                "bookingClass1": "ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "c1f5627e-a01a-4ec6-8f8a-93ac11aa1994",
                "ticketingAirline": "LBK",
                "ticketingAirline1": "AAS",
                "passengerType": "ADULT",
                "documentNumber": "YR1965010H",
                "origin": "OKL",
                "origin1": "HHI",
                "destination": "LAA",
                "destination1": "BPS",
                "airlineCode": "AAS",
                "airlineCode1": "VML",
                "bookingClass": "FIRST",
                "bookingClass1": "BUSINESS"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "6120e4ba-4648-4ac0-b0c2-d1a85e93f78d",
                "ticketingAirline": "RJY",
                "ticketingAirline1": "USK",
                "passengerType": "CHILD",
                "documentNumber": "PR4967263C",
                "origin": "LGA",
                "origin1": "FCO",
                "destination": "PMA",
                "destination1": "LCM",
                "airlineCode": "RJY",
                "airlineCode1": "NMP",
                "bookingClass": "PREMIUM_ECONOMY",
                "bookingClass1": "ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "028880a3-5a73-4df1-a078-96bd104eeecc",
                "ticketingAirline": "UCA",
                "ticketingAirline1": "USK",
                "passengerType": "CHILD",
                "documentNumber": "ZH9795302W",
                "origin": "DSN",
                "origin1": "WSA",
                "destination": "WSA",
                "destination1": "TOJ",
                "airlineCode": "RJY",
                "airlineCode1": "THL",
                "bookingClass": "PREMIUM_ECONOMY",
                "bookingClass1": "ECONOMY"
            },
            {
                "bookingReference": "1ZXSSA",
                "offerId": "33ec2aa9-1d99-49a6-aaa2-b1627cd0bfd5",
                "ticketingAirline": "RJY",
                "ticketingAirline1": "THL",
                "passengerType": "ADULT",
                "documentNumber": "RY6488743Q",
                "origin": "DSN",
                "origin1": "LCM",
                "destination": "CGH",
                "destination1": "BLM",
                "airlineCode": "THL",
                "airlineCode1": "WZZZ",
                "bookingClass": "ECONOMY",
                "bookingClass1": "PREMIUM_ECONOMY"
            }
        ]

        for (const payload of payloads) {
            request.server.inject({
                method: 'PUT',
                url: '/external/booking',
                payload
            });
        }

        return { ok: true };
    },

    getAirlines: async (request, h) => {
        const { Airline } = request.server.app.models;

        try {
            const airlines = await Airline.findAll();

            return { airlines };
        } catch (err) {
            console.log(err);
            return Boom.badImplementation(err);
        }
    },

    getOffers: async (request, h) => {
        const { user } = request.auth.credentials;

        try {
            const offers = await user.getOffers({
                through: {
                    where: {
                        bookingId: {
                            [Op.ne]: null
                        }
                    }
                }
            });

            return { offers };
        } catch (err) {
            console.log(err);
            return Boom.badImplementation(err);
        }
    },

    redeemOffer: async (request, h) => {
        const { offerId } = request.params;
        const { UserOffer, Offer } = request.server.app.models;
        const { user } = request.auth.credentials;

        const offer = await Offer.findOne({
            where: {
                id: offerId
            }
        })

        if (!offer) {
            return Boom.notFound('Offer not found')
        }

        const userOffer = await UserOffer.create({
            offerId,
            userId: user.id
        })

        return userOffer
    },

    spinRoulette: async (request, h) => {
        const { rouletteId } = request.params;
        const { UserRoulette, Roulette } = request.server.app.models;
        const { user } = request.auth.credentials;

        const roulette = await Roulette.findOne({
            where: {
                id: rouletteId
            }
        })

        if (!roulette) {
            return Boom.notFound('Offer not found')
        }

        const [userRoulette, created] = await UserRoulette.findOrCreate({
            where: {
                rouletteId,
                userId: user.id
            },
            defaults: {
                lastTryDate: moment()
            }
        });

        roulette.dataValues.canBeClicked = false

        if (!created) {
            if (moment().diff(created.lastTryDate, 'days') >= 7) {
                roulette.dataValues.canBeClicked = true
            }
            await userRoulette.update({ lastTryDate: moment() });
        }

        return { roulette };
    },

    searchFlights: async (request, h) => {
        const { user } = request.auth.credentials;
        const { Flight, Offer, Document } = request.server.app.models;
        const { origin, destination } = request.query;

        try {

            const userDoc = await Document.findOne({
                where: {
                    userId: user.id
                }
            })

            const flights = await Flight.findAll({
                where: {
                    origin,
                    destination
                }
            });

            if (!flights.length) {
                return Boom.notFound('No flights found');
            }

            const offers = await Offer.findAll({
                where: {
                    [Op.or]: [
                        {
                            origin,
                            destination: null
                        },
                        {
                            origin: null,
                            destination
                        },
                        {
                            origin,
                            destination
                        }
                    ]
                }
            });

            const headers = {
                'content-type': 'application/json; charset=utf-8',
            }

            const baseUrl = 'http://172.31.98.16:8088';

            await Wreck.post('/api/feedback', {
                baseUrl,
                headers,
                payload: [
                    {
                        FeedbackType: "read",
                        ItemId: `${origin}-${destination}`,
                        Timestamp: now,
                        UserId: userDoc.number
                    },
                ]
            });

            return { flights, offers };
        } catch (err) {
            console.log(err);
            return Boom.badImplementation(err);
        }
    },
}
