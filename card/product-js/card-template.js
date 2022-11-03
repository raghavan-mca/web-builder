let backend_url = 'http://localhost:2022/';

let pageTitle = "Templates";
$("#page_title").text(pageTitle);

let elArrayFields = [],
    currentDomains = [];

let linksGroupName = [];
let linksGroupElements = [],
    messagesTemplates = [],
    messageSortTemp = '',
    messageSortTempRes = '',
    myCards = [];
let socialPlatformField = '',
    rstr,
    messageRow, cSlNo = 0,
    cCheckNo = 0,
    templateUpdateMode = false;
let cTid, cUid, domainName, currentImage, currentDomain = 'temp1domain',
    currentTemplateId, currentEditTempThumb;

let loadDomainObj = {},
    cMessages = [],
    cIds = [],
    uData = {};

let socialPlatformGroupFields = '';

let tempMenu = {
    templates: {

        menus: [{
                title: "Professional Services",
                name: "professional-services",
                on_click: "loadTemplates(this);",
                icon: "icon-professional-service",
                templates_list: [
                    "ps_001"
                ]
            },
            {
                title: "Exporter/ Manufacturer",
                name: "manufacture-export",
                on_click: "loadTemplates(this);",
                icon: "icon-export-manufacture",
                templates_list: [
                    "me_001"
                ]
            },
            {
                title: "Service Provider",
                name: "service-provider",
                on_click: "loadTemplates(this);",
                icon: "icon-service-provider",
                templates_list: [
                    "sp_001"
                ]
            },
            {
                title: "Trader/ Supplier",
                name: "trader",
                on_click: "loadTemplates(this);",
                icon: "icon-trader-supplier",
                templates_list: [
                    "ts_001"
                ]
            },

            {
                title: "Website Builder",
                name: "free-website-builder",
                on_click: "loadTemplates(this);",
                icon: "icon-web",
                templates_list: [
                    "wt_001"
                ]
            },
        ],
        title: "Templates",
        name: "popular",
        on_click: "loadTemplates(this);",
        templates_list: []

    },
    my_cards: {
        menus: [{
                title: "My Cards",
                name: "my_cards",
                on_click: "loadTemplates(this);",
                icon: "icon-my-cards",
                templates_list: [
                    "template_general"
                ]
            },
            {
                title: "Messages",
                name: "messages",
                on_click: "loadMessages(this);",
                icon: "icon-message",
                templates_list: []
            },
        ],
        title: "Profile",
        name: "my_cards",
        on_click: "loadTemplates(this);",
        templates_list: []
    }
};

let templateDetails = [{
        id: "ps_001",
        name: "professional_sevices_001",
        display_name: "Professional Services 1",
        screen_thumb: "bc-001-screen.png"
    },
    {
        id: "me_001",
        name: "manufacture_export_001",
        display_name: "Exporter/ Manufacturer 1",
        screen_thumb: "me-001-screen.png"
    },
    {
        id: "sp_001",
        name: "service_provider_001",
        display_name: "Service & Provider 1",
        screen_thumb: "sp-001-screen.png"
    },
    {
        id: "ts_001",
        name: "trader_supplier_001",
        display_name: "Trader/ Supplier 1",
        screen_thumb: "ts-001-screen.png"
    },
    {
        id: "wt_001",
        name: "web_template_001",
        display_name: "Website 1",
        screen_thumb: "ts-001-screen.png"
    },

];

let elArray = [];

function closePopup(e) {
    $(e).parents(".abc-gpop-cont").removeClass("abc-scalein");
    $(e).parents(".abc-gpop-cont").removeClass("abc-slidein");
    setTimeout(() => {
        $("#domain_create_popup").children().remove();
        $("#contact_page").children().remove();
    }, 100)


}

function loadTemplatePreview(e) {

    event.stopPropagation();
    $(e).parents('.abc-gabs').removeClass('abc-mnav-expmin');
    $('.abc-gburg').removeClass('abc-gburg-close');

    $("#preview_popup").children().remove();

    if ($(e).attr('id') === 'mycards_prev') {

        $.each(templateDetails, (tempDetailKey, tempDetailVal) => {
            // console.log(tempDetailVal);

            if ($(e).parents(".abc-temp").attr("name") == tempDetailVal.id) {
                // console.log(tempDetailVal);
                let popupEl = ` <div class="abc-gpop-cont abc-scaleout">
                                <div class="abc-gpop-box">

                                    <div class="abc-gpop-head">
                                        <div class="abc-gpop-htxt">
                                            ${tempDetailVal.display_name}
                                        </div>
                                        <div class='abc-hrgt'>
                                            
                                            <div class="abc-gclose" onclick="closePopup(this);">
                                            </div>
                                        </div>

                                    </div>
                                    <div class="abc-gpop-body">

                                          <div class='abc-gbtn abc-abs-btn abc-prim-btn' name='${tempDetailVal.id}' onclick="loadEditMycardTemplate(this.attributes.name.value);">
                                                Edit this Template
                                            </div>
                                        <div class="abc-prev">
                                            <img class="abc-prev-img" src="../../images/${tempDetailVal.screen_thumb}" />
                                        </div>
                                    </div>
                                </div>
                            </div>`;

                $("#preview_popup").append(popupEl);
                setTimeout(() => {
                    $(".abc-gpop-cont").addClass("abc-scalein");
                }, 50);
            }
        });
    } else {

        $.each(templateDetails, (tempDetailKey, tempDetailVal) => {
            // console.log(tempDetailVal);

            if ($(e).parents(".abc-temp").attr("name") == tempDetailVal.id) {
                // console.log(tempDetailVal);
                let popupEl = ` <div class="abc-gpop-cont abc-scaleout">
                                <div class="abc-gpop-box">

                                    <div class="abc-gpop-head">
                                        <div class="abc-gpop-htxt">
                                            ${tempDetailVal.display_name}
                                        </div>
                                        <div class='abc-hrgt'>
                                            
                                            <div class="abc-gclose" onclick="closePopup(this);">
                                            </div>
                                        </div>

                                    </div>
                                    <div class="abc-gpop-body">

                                          <div class='abc-gbtn abc-abs-btn abc-prim-btn' name='${tempDetailVal.id}' onclick="loadEditTemplate(this.attributes.name.value);">
                                                Edit this Template
                                            </div>
                                        <div class="abc-prev">
                                            <img class="abc-prev-img" src="../../images/${tempDetailVal.screen_thumb}" />
                                        </div>
                                    </div>
                                </div>
                            </div>`;

                $("#preview_popup").append(popupEl);
                setTimeout(() => {
                    $(".abc-gpop-cont").addClass("abc-scalein");
                }, 50);
            }
        });
    }

}

function loadMessages(e) {

    $("#page_title").text("Messages");
    if ($(e).hasClass("abc-lnav-smenu")) {
        $(e).parents("#abc_left_nav").children(".abc-lnav-li").children("ul").children(".abc-lnav-subli").children(".abc-lnav-smenu").removeClass("abc-smenu-on");
    } else {
        $("#abc_left_nav").children(".abc-lnav-li").children(".abc-lnav-menu").removeClass("abc-smenu-on");
    }

    if ($(e).hasClass('abc-smenu-on')) {
        $(e).removeClass("abc-smenu-on");
    } else {
        $(e).addClass("abc-smenu-on");
    }

    $("#template_listing").removeClass("dn");
    $("#edit_template").children().remove();
    $("#edit_template").addClass("dn");
    $("#abc_general_body").removeClass("abc-edit-gbody");

    fetch(backend_url + 'fetch/message?uid=' + cUid, { method: 'GET' })
        .then((res) => {
            res.json()
                .then((res) => {
                    console.log(res);
                    if (res.data.length != 0) {

                        cMessages = res.data.data.filter_data;
                        generateMessages(cMessages);

                    } else {
                        generateInfoPage('No Messages Found !!!', '');
                    }

                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });

}

function generateMessages(cMessages) {
    let messageRows = '';
    for (let mess = 0; mess < cMessages.length; mess++) {

        messageRow = `
                                         <tr>
                                                <td class="abc-td">
                                                    <label class='abc-check'>
                                                        <input type="checkbox" id="${cMessages[mess].id}" onclick="delTableCheck(this);"/>
                                                        <span class='abc-check-bg'></span>
                                                    </label>
                                                </td>
                                                
                                                <td class="abc-td">
                                                    <span class="abc-td-lbl">
                                                    ${mess+1}
                                                    </span>
                                                </td>
                                                <td class="abc-td">
                                                    <span class="abc-td-lbl">
                                                        ${cMessages[mess].user_template_name}
                                                    </span>
                                                </td>
                                                <td class="abc-td">
                                                    <span class="abc-td-lbl">
                                                        ${cMessages[mess].created_at.split('T')[0]}
                                                    </span>
                                                </td>
                                                <td class="abc-td">
                                                    <span class="abc-td-lbl">
                                                        ${cMessages[mess].first_name}
                                                    </span>
                                                </td>
                                                <td class="abc-td">
                                                    <span class="abc-td-lbl">
                                                        ${cMessages[mess].phone_number}
                                                    </span>
                                                </td>
                                                <td class="abc-td">
                                                    <span class="abc-td-lbl">
                                                        ${cMessages[mess].email}
                                                    </span>
                                                </td>
                                                <td class="abc-td">
                                                    <span class="abc-td-lbl">
                                                        ${cMessages[mess].message}
                                                    </span>
                                                </td>
                                            </tr>
                            `;
        messageRows += messageRow;
        messageSortTempRes = '' + `<div class='abc-th-opt' onclick="sortTemplate(this);" name="${cMessages[mess].user_template_name}">${cMessages[mess].user_template_name}`;
        // messagesTemplates.push(cMessages[mess].user_template_name);
    }
    messageTable = `

                                <div class='abc-temp-sec'>

                                     <div class="abc-table-box">
                                        <table class="abc-table">
                                            <thead>
                                                <th class="abc-th abc-sm">
                                                    <label class='abc-check'>
                                                        <input type="checkbox" id="check_all" onclick="delTableCheck(this);"/>
                                                        <span class='abc-check-bg'></span>
                                                    </label>
                                                </th>
                                                <th class="abc-th abc-sm">
                                                    <span class="abc-th-lbl">
                                                        Sl.No
                                                    </span>
                                                </th>
                                                 <th class="abc-th">
                                                    <span class="abc-th-lbl">
                                                        Template
                                                    </span>
                                                    <div class='abc-th-arr' onclick="toggSortTemp(this);">
                                                        <div class='darr'>
                                                        </div>
                                                        
                                                    </div>
                                                    <div class='abc-th-opts dn' id="sort_temp_box">
                                                        ${messageSortTempRes}
                                                    </div>
                                                </th>
                                                <th class="abc-th">
                                                    <span class="abc-th-lbl">
                                                        Created At
                                                    </span>
                                                </th>
                                                <th class="abc-th">
                                                    <span class="abc-th-lbl">
                                                        FirstName
                                                    </span>
                                                </th>
                                                <th class="abc-th">
                                                    <span class="abc-th-lbl">
                                                        Mobile Number
                                                    </span>
                                                </th>
                                                <th class="abc-th">
                                                    <span class="abc-th-lbl">
                                                        Email
                                                    </span>
                                                </th>
                                                <th class="abc-th abc-lg">
                                                    <span class="abc-th-lbl">
                                                        Message
                                                    </span>
                                                </th>
                                            </thead>
                                            <tbody>
                                               ${messageRows}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="abc-del-act" id="abc_del_action">
                                        <div class="abc-del-icon abc-ico-gry">
                                            <i class="fa-solid fa-circle-xmark"></i>
                                        </div>
                                        <div class='abc-del-lbl' id="checked_nos">
                                        </div>
                                        <div class="abc-del-icon abc-ico-red" onclick='delTableRow(this);'>
                                            <i class="fa-solid fa-trash"></i>
                                        </div>
                                    </div>
                                </div>
                              `;

    $("#template_listing").children().remove();
    $("#template_listing").append(messageTable);
    $("#template_listing").removeClass("abc-trans-lft0");

    setTimeout(() => {
        $("#template_listing").addClass("abc-trans-lft0");
    }, 200);
}

function toggSortTemp(e) {
    $('#sort_temp_box').toggleClass('dn');
}

function sortTemplate(e) {
    if ($(e).attr('name')) {
        fetch(backend_url + 'fetch/message?uid=' + cUid + '&user_template_name=' + $(e).attr('name'), { method: 'GET' })
            .then((res) => {
                res.json()
                    .then((res) => {
                        console.log(res);
                        if (res.statuscode === 200 && res.message === 'success') {
                            generateMessages(res.data.data.filter_data);
                            generateAlert('bg-green', 'Templates Sorted Successfully.', '');
                        } else {
                            generateAlert('bg-red', 'Templates Not Sorted !!!', 'Something Went Wrong, Please Try Again.');
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

function delTableCheck(e) {

    console.log($(e).attr('id'));

    $('#abc_del_action').addClass('abc-del-show');

    if ($(e).attr('id') === 'check_all') {
        if ($(e).is(':checked')) {
            $("#checked_nos").children().remove();

            console.log('ch');

            cCheckNo = 0;

            $('.abc-td').children('label').children('input').prop('checked', true).trigger('change');
            $('.abc-td').children('label').children('input').prop('checked', true).trigger('onclick');

        } else {
            $("#checked_nos").children().remove();

            $('.abc-td').children('label').children('input').prop('checked', false).trigger('change');
            $('.abc-td').children('label').children('input').prop('checked', false).trigger('onclick');

            if (cCheckNo === 0) {
                $('#abc_del_action').removeClass('abc-del-show');
            }
        }
    } else {

        if ($(e).is(':checked')) {
            $("#checked_nos").children().remove();

            cCheckNo += 1;
            $('#checked_nos').append(`<span class='abc-iblue'>${cCheckNo}</span> <span>Selected</span> `);

            if (cIds.includes($(e).attr('id'))) {} else {
                cIds.push($(e).attr('id'));
            }
            console.log(cIds);
        } else {
            $("#checked_nos").children().remove();

            if (cCheckNo != 0) {
                cCheckNo -= 1;
            }
            $('#checked_nos').append(`<span class='abc-iblue'>${cCheckNo}</span> <span>Selected</span>`);

            cIds.splice(cIds.indexOf($(e).attr('id')), 1);
            console.log(cIds);
            if (cCheckNo === 0) {

                $('#check_all').prop('checked', false);
                cIds = [];
                $('#abc_del_action').removeClass('abc-del-show');
            }
        }
    }
}

function delTableRow(e) {
    console.log(cIds);

    let messDelObj = {
        method: 'DELETE',
        body: JSON.stringify({
            ids: cIds
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(backend_url + 'delete/message', messDelObj)
        .then((res) => {
            res.json()
                .then((res) => {
                    console.log(res);
                    if (res.statuscode === 202 && res.message === 'success') {
                        loadMessages();
                        generateAlert('bg-green', 'Messages Deleted Successfully !!!', '');
                        cCheckNo = 0;
                        cIds = [];
                    } else {
                        generateAlert('bg-red', 'Messages Not Deleted !!!', 'Something Went Wrong, Please Try Again.');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
}

function loadTemplates(e) {
    // event.stopPropagation();
    elArray = [];
    elArrayFields = [];
    socialPlatformGroupFields = [];
    formSubmitVals = [];
    tempFormData = {};
    $("#abc_edit_form").children().remove();

    templateUpdateMode = false;

    $("#page_title").text("Templates");

    localStorage.removeItem("template_id");
    // console.log($(e).hasClass("abc-lnav-smenu"));

    // $(e).children(".abc-lnav-li").children(".abc-lnav-menu").removeClass("abc-smenu-on");

    if ($(e).hasClass("abc-lnav-smenu")) {
        $(e).parents("#abc_left_nav").children(".abc-lnav-li").children("ul").children(".abc-lnav-subli").children(".abc-lnav-smenu").removeClass("abc-smenu-on");
    } else {
        $("#abc_left_nav").children(".abc-lnav-li").children(".abc-lnav-menu").removeClass("abc-smenu-on");
    }

    if ($(e).hasClass('abc-smenu-on')) {
        $(e).removeClass("abc-smenu-on");
    } else {
        $(e).addClass("abc-smenu-on");
    }
    // console.log($(".abc-lnav-menu"));

    $("#template_listing").removeClass("dn");
    $("#edit_template").children().remove();
    $("#edit_template").addClass("dn");
    $("#abc_general_body").removeClass("abc-edit-gbody");

    let currentMenuName = event.currentTarget.attributes.name.value;
    findTemplate(currentMenuName);
    fetch(backend_url + 'user?uid=' + cUid, { method: 'GET' })
        .then((res) => {
            res.json()
                .then((res) => {
                    localStorage.setItem('udata', JSON.stringify(res));
                })
                .catch((err) => {
                    console.log(err)
                });
        })
        .catch((err) => {
            console.log(err)
        });

    if ($(e).attr('name') === 'my_cards') {
        fetch(backend_url + 'fetch/user/template?uid=' + cUid, { method: 'GET' })
            .then((res) => {
                res.json()
                    .then((res) => {
                        myCards = res.data.domain;
                        if ($(e).attr('name') === 'my_cards') {
                            loadMyCards(myCards, e);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }

}

async function apiFetchMyCards(e) {
    fetch(backend_url + 'fetch/user/template?uid=' + cUid, { method: 'GET' })
        .then((res) => {
            res.json()
                .then((res) => {
                    myCards = res.data.domain;
                    if ($(e).attr('name') === 'my_cards') {
                        loadMyCards(myCards, e);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
}

function loadMyCards(myCards, e) {
    let myCardTempConcat = '';
    // elArray = [];
    // elArrayFields = [];
    // socialPlatformGroupFields = [];
    // formSubmitVals = [];
    // tempFormData = {};
    // $("#abc_edit_form").children().remove();

    templateUpdateMode = true;
                                        console.log(myCards);

    fetch(backend_url + 'fetch/user/template?uid=' + cUid, { method: 'GET' })
        .then((res) => {
            res.json()
                .then((res) => {
                    myCards = res.data.domain;
                    if ($(e).attr('name') === 'my_cards') {
                        // loadMyCards(myCards);
                        if (myCards === undefined) {
                            generateInfoPage('No Cards Found !!!', 'Please Check Templates Menu to Create a Tempalte');
                        } else {

                            $.each(myCards, (i, v) => {
                                if(myCards[i].domain === 'No_Domain') {
                                    var domainBadge = ``;
                                }
                                else {
                                    var domainBadge = `
                                                        <div class='abc-sm-badge bg-green'>
                                                            Domain
                                                        </div>
                                                      `
                                }

                                let myCardTemp = `
                                        <div class="abc-temp" name="${myCards[i].template_name}" onclick="loadEditMycardTemplate(this.attributes.name.value);">
                                            <div class="abc-temp-img">
                                                <img src="../../images/${myCards[i].template_thumb}" class="abc-temp-ico">
                                            </div>
                                            <div class="abc-temp-lbl">
                                                ${myCards[i].user_template_name}
                                            </div>
                                            <div class="abc-temp-ft">
                                                <div class="abc-gbtn abc-prim-btn" name="${myCards[i].template_name}" onclick="loadEditMycardTemplate(this.attributes.name.value);">
                                                    Edit
                                                </div>
                                                <div class="abc-gbtn abc-sec-btn" id="mycards_prev" onclick="loadTemplatePreview(this);">
                                                    Preview                            
                                                </div>
                                            </div>
                                            <div class='abc-temp-actb'>
                                                <div class='abc-temp-act abc-act-info' name="${backend_url + myCards[i].domain}" onclick="shareMyCard(this);">
                                                    <input id="copy_link_inp" class='dn' />
                                                    <i class="fa-solid fa-share"></i>
                                                </div>
                                                <div class='abc-temp-act' name="${myCards[i].template_name}" onclick="delMyCardTemplate(this);">
                                                    <i class="fa-solid fa-trash"></i>
                                                </div>
                                            </div>
                                            ${domainBadge}
                                        </div>
                                        `;
                                myCardTempConcat += myCardTemp;
                            });

                            //Adding Template Listing
                            let mycardListingSection = `<div class="abc-temp-sec">
                            
                                                                <div class="abc-head-lbl">
                                                                    My Cards
                                                                </div>
                                                                <div class="abc-temp-box">

                                                                    ${myCardTempConcat}

                                                                </div>
                                                            </div>`;
                            // console.log(activeMenuListing);
                            $("#template_listing").children().remove();
                            $("#template_listing").append(mycardListingSection);
                            $("#template_listing").removeClass("abc-trans-lft0");

                            setTimeout(() => {
                                $("#template_listing").addClass("abc-trans-lft0");
                            }, 200);
                        }

                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });


}

function shareMyCard(e) {
    event.stopPropagation();
    let currentShareDomain = $(e).attr('name');
    if (currentShareDomain.includes('No_Domain') || currentShareDomain.includes('undefined')) {
        generateAlert('bg-red', 'No Domain Created !!!', 'Please Create a Domain.');
    } else {
        let copiedLink = $('#copy_link_inp').val(currentShareDomain).select();
        console.log(copiedLink[0].value);
        navigator.clipboard.writeText(copiedLink[0].value);
        generateAlert('bg-green', 'Domain Link Copied to Clipboard !!!', '');

    }
}

async function delMyCardTemplate(e) {
    event.stopPropagation();
    let delTempObj = {
        method: 'DELETE'
    }
    fetch(backend_url + 'remove/user/template/' + cUid + '/' + $(e).attr('name'), delTempObj)
        .then((res) => {
            res.json()
                .then((res) => {
                    if (res.data.statuscode === 200 && res.data.message === 'success') {
                        fetch(backend_url + 'fetch/user/template?uid=' + cUid, { method: 'GET' })
                            .then((res) => {
                                res.json()
                                    .then((res) => {
                                        myCards = res.data.domain;
                                        loadMyCards(myCards, e);
                                        generateAlert('bg-green', 'Template Deleted Successfully', '');
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    });
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    } else {
                        generateAlert('bg-red', 'Template Not Deleted !!!', 'Something went wrong,Please Try Again.');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
}

function loadEditMycardTemplate(templateName) {
    console.log('ctemp' + templateName);

    // for(let el=0; el<myCards.length; el++){
    //     if(templateName === myCards[el].template_name) {
    //         if(templateName === 'ps_001') {
    //             console.log('ps' + myCards[el].f_company_name);

    //         }
    //         else if(templateName === 'me_001') {
    //             console.log('me' + myCards[el].f_company_name);
    //         }
    //     }
        
    // }
    for(let el=0; el<myCards.length; el++) {

        // console.log(myCards[el].template_name + 'L')
        // console.log(myCards[el].template_name === 'ps_001')

     if (templateName === myCards[el].template_name) {

        if (templateName === 'ps_001') {

            let ps_001 = `
            <div class="bcard-parent">
                    <div class="bcard-box bcard-temp-1">
                        <a id="Home"></a>
                        <div class="bcard-profbox">
                             <div class="bcard-prof bcard-comp">
                                <img src="${myCards[el].f_company_img}" name="f_company_img" data-field-name="Company Logo" class="bcard-profimg bcard-compimg">
                            </div>
                            <div class="bcard-prof">
                                <img src="${myCards[el].f_prof_img}" name="f_prof_img" data-field-name="Profile" class="bcard-profimg">
                            </div>
                            <div class="bcard-prof-sec">
                                <div>
                                    <span class="bcard-prof-btxt" name="f_prof_name" data-field-name="Profile Name" data-multiline="false">
                                        ${myCards[el].f_prof_name}
                                    </span>
                                       <span class="bcard-prof-smtxt" name="f_prof_profession" data-field-name="Profession" data-multiline="false">
                                            ${myCards[el].f_prof_profession}
                                        </span>
                                </div>
                                <div class="bcard-act">
                                    <div class="bcard-acticon ico-fb">
                                        <a target="_blank" name="f_fb" href="${myCards[el].f_fb}" data-sm="true" data-field-name='Facebook'>
                                            <i class="fa-brands fa-facebook-f"></i>
                                        </a>
                                    </div>
                                    <div class="bcard-acticon ico-whatsapp">
                                        <a target="_blank" name="f_whatsapp" href="https://wa.me/+${myCards[el].f_whatsapp}" data-sm="true" data-field-name='Whatsapp'>
                                            <i class="fa-brands fa-whatsapp"></i>
                                        </a>
                                    </div>
                                    <div class="bcard-acticon ico-insta">
                                        <a target="_blank" name="f_insta" href="${myCards[el].f_insta}" data-sm="true" data-field-name='Instagram'>
                                            <i class="fa-brands fa-instagram"></i>
                                        </a>
                                    </div>
                                    <div class="bcard-acticon ico-tw">
                                        <a target="_blank" name="f_twitter" href="${myCards[el].f_twitter}" data-sm="true" data-field-name='Twitter'>
                                           <i class="fa-brands fa-twitter"></i>
                                        </a>
                                    </div>
                                    <div class="bcard-acticon ico-linked">
                                        <a target="_blank" name="f_linked" href="${myCards[el].f_linked}" data-sm="true" data-field-name='Linked In'>
                                          <i class="fa-brands fa-linkedin-in"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bcard-cont">
                            <div class="bcard-sec">
                                <div class="bcard-padd">
                                    <div class="bcard-frow-subsec">
                                        <span class="bcard-btxt" name="f_company_name" data-field-name="Company Name" data-multiline="false">
                                            ${myCards[el].f_company_name}
                                        </span>
                                     
                                    </div>
                                    <a target="_blank" name="f_phone" href="tel:+${myCards[el].f_phone}" data-sm="true" data-field-name='Phone No' class="bcard-frow-sec">
                                        <div class="bcard-smico-sec">
                                            <i class="fa-solid fa-phone"></i>
                                        </div>
                                        <div class="bcard-sub-txt">
                                            ${myCards[el].f_phone}
                                        </div>
                                    </a>
                                    <a target="_blank" name="f_website" href="${myCards[el].f_website}" data-sm="true" data-field-name='Website' class="bcard-frow-sec">
                                        <div class="bcard-smico-sec">
                                            <i class="fa-solid fa-globe"></i>
                                        </div>
                                        <div class="bcard-sub-txt">
                                           ${myCards[el].f_website}
                                        </div>
                                    </a>
                                    <a target="_blank" name="f_email" href="mailto:${myCards[el].f_email}" data-sm="true" data-field-name='Email' class="bcard-frow-sec">
                                        <div class="bcard-smico-sec">
                                            <i class="fa-solid fa-envelope"></i>
                                        </div>
                                        <div class="bcard-sub-txt">
                                            ${myCards[el].f_email}
                                        </div>
                                    </a>
                                    <a target="_blank" name="f_location" href="${myCards[el].f_location}" data-sm="true" data-field-name='Location' class="bcard-frow-sec">
                                        <div class="bcard-smico-sec">
                                            <i class="fa-sharp fa-solid fa-location-dot"></i>
                                        </div>
                                        <div class="bcard-sub-txt">
                                            ${myCards[el].f_location}
                                        </div>
                                    </a>
                                    <div class="bcard-ph-sec">
                                        <div class="bcard-sec-btn">
                                            Add to Contacts
                                        </div>
                                       <a target="_blank" id="share_wa" class="bcard-sec-btn" href="#">
                                            Share on Whatsapp
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="bcard-sec">
                                <a id="About">
                                    <span class="bcard-btxt" name="f_about_title" data-field-name="About Title" data-multiline="false">
                                        ${myCards[el].f_about_title}
                                    </span>
                                    <div class="bcard-sub-sec">
                                        <div>
                                            <span class="bcard-sub-lbl" name="f_about_txt_1" data-field-name="About Section 1" data-multiline="false">
                                                ${myCards[el].f_about_txt_1}
                                            </span>
                                        </div>
                                        <div>
                                            <span class="bcard-sub-lbl" name="f_about_txt_2" data-field-name="About Section 2" data-multiline="true">
                                                ${myCards[el].f_about_txt_2}
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div class="bcard-sec">
                                <a id="Services">
                                    <span class="bcard-btxt" name="f_services_title" data-field-name="Services Title" data-multiline="false">
                                         ${myCards[el].f_services_title}
                                    </span>
                                    <div class="bcard-sub-sec">
                                        <div>
                                            <span class="bcard-sub-lbl" name="f_services_txt_1" data-field-name="Services Section 1" data-multiline="false">
                                                ${myCards[el].f_services_txt_1}
                                            </span>
                                        </div>
                                        <div>
                                            <span class="bcard-sub-lbl" name="f_services_txt_2" data-field-name="Services Section 2" data-multiline="true">
                                               ${myCards[el].f_services_txt_2}
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div class="bcard-sec">
                                <a id="Enquiry">
                                    <div class="bcard-btxt">
                                        Contact Us
                                    </div>
                                    <div class="bcard-sub-sec">
                                        <div class="bcard-frm-sec">
                                            <div class="bcard-frm-btxt">
                                                FirstName
                                            </div>
                                            <div class="bcard-frm-inpb">
                                                <input placeholder="FirstName" type="text" class="bcard-frm-inp" />
                                            </div>
                                        </div>
                                        <div class="bcard-inp-sec">
                                            <div class="bcard-frm-sec bcard-frm-half">
                                                <div class="bcard-frm-btxt">
                                                    Mobile Number
                                                </div>
                                                <div class="bcard-frm-inpb">
                                                    <input placeholder="Mobile No" type="text" class="bcard-frm-inp" />
                                                </div>
                                            </div>
                                            <div class="bcard-frm-sec bcard-frm-half">
                                                <div class="bcard-frm-btxt">
                                                    Email
                                                </div>
                                                <div class="bcard-frm-inpb">
                                                    <input placeholder="Email" type="text" class="bcard-frm-inp" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="bcard-frm-sec">
                                            <div class="bcard-frm-btxt">
                                                Message
                                            </div>
                                            <div>
                                                <textarea placeholder="Message" type="text" class="bcard-frm-ml"></textarea>
                                            </div>
                                        </div>
                                        <div class="bcard-btn">
                                            Submit
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div class="bcard-sec bcard-ft">
                                <span class="bcard-ft-btxt" name="f_address" data-field-name="Address" data-multiline="true">
                                    ${myCards[el].f_address}
                                </span>
                                <span class="bcard-ft-btxt" name="f_phno" data-field-name="Contact" data-multiline="false">
                                     ${myCards[el].f_phno}
                                </span>
                                <span class="bcard-ft-lbl" name="f_copyright" data-field-name="Copyright" data-multiline="false">
                                   ${myCards[el].f_copyright}
                                </span>
                            </div>
                            <div class="bcard-copyrgt-ft">
                                Designed & Developed by
                                <div class="bcard-ft-logo">
                                    <div class="bcard-ft-img">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bcard-opt-fix">
                        <a href="#Home" class="bcard-opt">
                            <div class="bcard-opt-ico">
                                <i class="fa-solid fa-house-chimney"></i>
                            </div>
                            <div class="bcard-opt-txt">
                                Home
                            </div>
                        </a>
                        <a href="#About" class="bcard-opt">
                            <div class="bcard-opt-ico">
                                <i class="fa-solid fa-circle-info"></i>
                            </div>
                            <div class="bcard-opt-txt">
                                About
                            </div>
                        </a>
                        <a href="#Services" class="bcard-opt">
                            <div class="bcard-opt-ico">
                                <i class="fa-solid fa-hand-holding-hand"></i>
                            </div>
                            <div class="bcard-opt-txt">
                                Services
                            </div>
                        </a>
                        <a href="#Enquiry" class="bcard-opt">
                            <div class="bcard-opt-ico">
                                <i class="fa-solid fa-comment"></i>
                            </div>
                            <div class="bcard-opt-txt">
                                Enquiry
                            </div>
                        </a>
                    </div>
                </div>
                <style>
                    :root {
                        --primary: #3794e9;
                        --primary-lt: #f1f8ff;
                        --primary-dk:  #002f5a;
                        --white:#ffffff;
                        --gry-lt:  #f9f9f9;
                        --gry: #efefef;
                        --gry-dk:  #6e6e6e;
                    }

                    * {
            margin: 0px;
            padding: 0px;
            box-sizing: border-box;
            }

            html {
                font-size: 15px;
            }

            body {
                padding: 0px;
                margin: 0px;
            }


                </style>
                 `;
            let mycard_arr = ['ps_001', ps_001, myCards[el].user_template_name];
            loadEditTemplate(mycard_arr);
            console.log('e-ps001');
            break;
        } 
        else if (templateName === 'me_001') {

            let me_001 = `
                        <div class="bcard-parent">
            <div class="bcard-box bcard-temp-2" data-theme="me_001">
                <a id="Home"></a>
                <div class="bcard-profbox">

                    <div class="bcard-prof">
                        <img src="${myCards[el].f_prof_img}" name="f_prof_img" data-field-name="Profile" class="bcard-profimg">
                    </div>
                    <div class="bcard-prof-sec bcard-profbg">
                         <div class="bcard-prof bcard-comp">
                            <img src="${myCards[el].f_company_img}" name="f_company_img" data-field-name="Company Logo" class="bcard-profimg bcard-compimg">
                        </div>
                        <div>
                            <span class="bcard-prof-btxt" name="f_prof_name" data-field-name="Profile Name" data-multiline="false">
                                ${myCards[el].f_prof_name}
                            </span>
                            <span class="bcard-prof-smtxt" name="f_prof_profession" data-field-name="Profession" data-multiline="false">
                                ${myCards[el].f_prof_profession}
                            </span>
                        </div>
                        <div class="bcard-act">
                            <div class="bcard-acticon ico-fb">
                                <a target="_blank" name="f_fb" href="${myCards[el].f_fb}" data-sm="true" data-field-name='Facebook'>
                                    <i class="fa-brands fa-facebook-f"></i>
                                </a>
                            </div>
                            <div class="bcard-acticon ico-whatsapp">
                                <a target="_blank" name="f_whatsapp" href="https://wa.me/${myCards[el].f_whatsapp}" data-sm="true" data-field-name='Whatsapp'>
                                    <i class="fa-brands fa-whatsapp"></i>
                                </a>
                            </div>
                            <div class="bcard-acticon ico-insta">
                                <a target="_blank" name="f_insta" href="${myCards[el].f_insta}" data-sm="true" data-field-name='Instagram'>
                                    <i class="fa-brands fa-instagram"></i>
                                </a>
                            </div>
                            <div class="bcard-acticon ico-tw">
                                <a target="_blank" name="f_twitter" href="${myCards[el].f_twitter}" data-sm="true" data-field-name='Twitter'>
                                   <i class="fa-brands fa-twitter"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bcard-cont">
                    <div class="bcard-sec">
                        <div class="bcard-secbg-me">
                        </div>
                        <div class="bcard-padd">
                            <div class="bcard-frow-subsec">
                                <span class="bcard-btxt" name="f_prof_name" data-field-name="Profile Name" data-multiline="false">
                                    ${myCards[el].f_prof_name}
                                </span>
                              
                            </div>
                            <a target="_blank" name="f_phone" href="tel:${myCards[el].f_phone}" data-sm="true" data-field-name='Phone No' class="bcard-frow-sec">
                                <div class="bcard-smico-sec">
                                    <i class="fa-solid fa-phone"></i>
                                </div>
                                <div class="bcard-sub-txt">
                                    ${myCards[el].f_phone}
                                </div>
                            </a>
                            <a target="_blank" name="f_website" href="${myCards[el].f_website}" data-sm="true" data-field-name='Website' class="bcard-frow-sec">
                                <div class="bcard-smico-sec">
                                    <i class="fa-solid fa-globe"></i>
                                </div>
                                <div class="bcard-sub-txt">
                                    ${myCards[el].f_website}
                                </div>
                            </a>
                            <a target="_blank" name="f_email" href="mailto:${myCards[el].f_email}" data-sm="true" data-field-name='Email' class="bcard-frow-sec">
                                <div class="bcard-smico-sec">
                                    <i class="fa-solid fa-envelope"></i>
                                </div>
                                <div class="bcard-sub-txt">
                                   ${myCards[el].f_email}
                                </div>
                            </a>
                            <a target="_blank" name="f_location" href="${myCards[el].f_location}" data-sm="true" data-field-name='Location' class="bcard-frow-sec">
                                <div class="bcard-smico-sec">
                                    <i class="fa-sharp fa-solid fa-location-dot"></i>
                                </div>
                                <div class="bcard-sub-txt">
                                    ${myCards[el].f_location}
                                </div>
                            </a>
                            <div class="bcard-ph-sec">
                                <div class="bcard-sec-btn">
                                    Add to Contacts
                                </div>
                                <a target="_blank" id="share_wa" class="bcard-sec-btn" href="#">
                                Share on Whatsapp
                            </a>
                            </div>
                        </div>
                    </div>
                    <div class="bcard-sec">
                        <a id="About">
                            <span class="bcard-btxt" name="f_about_title" data-field-name="About Title" data-multiline="false">
                               ${myCards[el].f_about_title}
                            </span>
                            <div class="bcard-sub-sec">
                                <div>
                                    <span class="bcard-sub-lbl" name="f_about_txt_1" data-field-name="About Section 1" data-multiline="false">
                                         ${myCards[el].f_about_txt_1}
                                    </span>
                                </div>
                                <div>
                                    <span class="bcard-sub-lbl" name="f_about_txt_2" data-field-name="About Section 2" data-multiline="true">
                                         ${myCards[el].f_about_txt_2}
                                    </span>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="bcard-sec">
                        <a id="Services">
                            <span class="bcard-btxt" name="f_services_title" data-field-name="Services Title" data-multiline="false">
                                ${myCards[el].f_services_title}
                            </span>
                            <div class="bcard-sub-sec">
                                <div>
                                    <span class="bcard-sub-lbl" name="f_services_txt_1" data-field-name="Services Section 1" data-multiline="false">
                                        ${myCards[el].f_services_txt_1}
                                    </span>
                                </div>
                                <div>
                                    <span class="bcard-sub-lbl" name="f_services_txt_2" data-field-name="Services Section 2" data-multiline="true">
                                        ${myCards[el].f_services_txt_2}
                                    </span>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="bcard-sec">
                        <a id="Products">
                            <span class="bcard-btxt" name="f_products_title" data-field-name="Products Title" data-multiline="false">
                               ${myCards[el].f_products_title}
                            </span>
                            <div class="bcard-prod-cont">
                                <div class="bcard-prod-imgb">
                                    <img class="bcard-prod-img" name="f_prod_img1" data-field-name="Watches" src='${myCards[el].f_prod_img1}' />
                                </div>
                                <div class="bcard-prod-imgb">
                                    <img class="bcard-prod-img" name="f_prod_img2" data-field-name="Smart Watches" src='${myCards[el].f_prod_img2}' />
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="bcard-sec">
                        <a id="Enquiry">
                            <div class="bcard-btxt">
                                Contact Us
                            </div>
                            <div class="bcard-sub-sec">
                                <div class="bcard-frm-sec">
                                    <div class="bcard-frm-btxt">
                                        FirstName
                                    </div>
                                    <div class="bcard-frm-inpb">
                                        <input placeholder="FirstName" type="text" class="bcard-frm-inp" />
                                    </div>
                                </div>
                                <div class="bcard-inp-sec">
                                    <div class="bcard-frm-sec bcard-frm-half">
                                        <div class="bcard-frm-btxt">
                                            Mobile Number
                                        </div>
                                        <div class="bcard-frm-inpb">
                                            <input placeholder="Mobile No" type="text" class="bcard-frm-inp" />
                                        </div>
                                    </div>
                                    <div class="bcard-frm-sec bcard-frm-half">
                                        <div class="bcard-frm-btxt">
                                            Email
                                        </div>
                                        <div class="bcard-frm-inpb">
                                            <input placeholder="Email" type="text" class="bcard-frm-inp" />
                                        </div>
                                    </div>
                                </div>
                                <div class="bcard-frm-sec">
                                    <div class="bcard-frm-btxt">
                                        Message
                                    </div>
                                    <div class="bcard-frm-inpb">
                                        <input placeholder="Message" type="text" class="bcard-frm-inp" />
                                    </div>
                                </div>
                                <div class="bcard-btn">
                                    Submit
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="bcard-sec bcard-ft">
                        <span class="bcard-ft-btxt" name="f_address" data-field-name="Address" data-multiline="true">
                            ${myCards[el].f_address}
                        </span>
                        <span class="bcard-ft-btxt" name="f_phno" data-field-name="Contact" data-multiline="false">
                            ${myCards[el].f_phno}
                        </span>
                        <span class="bcard-ft-lbl" name="f_copyright" data-field-name="Copyright" data-multiline="false">
                            ${myCards[el].f_copyright}
                        </span>
                    </div>
                    <div class="bcard-copyrgt-ft">
                        Designed & Developed by
                        <div class="bcard-ft-logo">
                            <div class="bcard-ft-img">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bcard-opt-fix">
                <a href="#Home" class="bcard-opt">
                    <div class="bcard-opt-ico">
                        <i class="fa-solid fa-house-chimney"></i>
                    </div>
                    <div class="bcard-opt-txt">
                        Home
                    </div>
                </a>
                <a href="#About" class="bcard-opt">
                    <div class="bcard-opt-ico">
                        <i class="fa-solid fa-circle-info"></i>
                    </div>
                    <div class="bcard-opt-txt">
                        About
                    </div>
                </a>
                <a href="#Services" class="bcard-opt">
                    <div class="bcard-opt-ico">
                        <i class="fa-solid fa-hand-holding-hand"></i>
                    </div>
                    <div class="bcard-opt-txt">
                        Services
                    </div>
                </a>
                <a href="#Enquiry" class="bcard-opt">
                    <div class="bcard-opt-ico">
                        <i class="fa-solid fa-comment"></i>
                    </div>
                    <div class="bcard-opt-txt">
                        Enquiry
                    </div>
                </a>
            </div>
        </div>
        <style>
            :root {
                --primary: #3794e9;
                --primary-lt: #f1f8ff;
                --primary-dk:  #002f5a;
                --white:#ffffff;
                --gry-lt:  #f9f9f9;
                --gry: #efefef;
                --gry-dk:  #6e6e6e;
            }

            * {
                    margin: 0px;
                    padding: 0px;
                    box-sizing: border-box;
                }

                html {
                    font-size: 15px;
                }

                body {
                    padding: 0px;
                    margin: 0px;
                }

                
                .bcard-temp-2[data-theme="me_001"]{
                    --primary: #ffbf42;
                    --primary-dk: #0b416f;
                    --primary-lt:  #fffbf5;
                }
            </style>
                   `;
            let mycard_arr = ['me_001', me_001, myCards[el].user_template_name];
            loadEditTemplate(mycard_arr);
            console.log('e-me001');
            break;


        } else if (templateName === 'sp_001') {

            let sp_001 = `
                        <div class="bcard-parent">
            <div class="bcard-box bcard-temp-3" data-theme="sp_001">
                <a id="Home"></a>
                 <div class="bcard-prof bcard-comp">
                        <img src="${myCards[el].f_company_img}" name="f_company_img" data-field-name="Company Logo" class="bcard-profimg bcard-compimg">
                    </div>
                <div class="bcard-profbox">
                    <div class="bcard-prof">
                        <img src="${myCards[el].f_prof_img}" name="f_prof_img" data-field-name="Profile" class="bcard-profimg">
                    </div>
                    <div class="bcard-prof-sec">
                        <div>
                            <span class="bcard-prof-btxt" name="f_prof_name" data-field-name="Company Name" data-multiline="false">
                              ${myCards[el].f_prof_name}
                            </span>
                            <span class="bcard-prof-smtxt" name="f_prof_profession" data-field-name="Profession" data-multiline="false">
                                    ${myCards[el].f_prof_profession}
                                </span>
                        </div>
                        <div class="bcard-act">
                            <div class="bcard-acticon ico-fb">
                                <a target="_blank" name="f_fb" href="${myCards[el].f_fb}" data-sm="true" data-field-name='Facebook'>
                                    <i class="fa-brands fa-facebook-f"></i>
                                </a>
                            </div>
                            <div class="bcard-acticon ico-whatsapp">
                                <a target="_blank" name="f_whatsapp" href="https://wa.me/${myCards[el].f_whatsapp}" data-sm="true" data-field-name='Whatsapp'>
                                    <i class="fa-brands fa-whatsapp"></i>
                                </a>
                            </div>
                            <div class="bcard-acticon ico-insta">
                                <a target="_blank" name="f_insta" href="${myCards[el].f_insta}" data-sm="true" data-field-name='Instagram'>
                                    <i class="fa-brands fa-instagram"></i>
                                </a>
                            </div>
                            <div class="bcard-acticon ico-tw">
                                <a target="_blank" name="f_twitter" href="${myCards[el].f_twitter}" data-sm="true" data-field-name='Twitter'>
                                   <i class="fa-brands fa-twitter"></i>
                                </a>
                            </div>
                             <div class="bcard-acticon ico-linked">
                                <a target="_blank" name="f_linked" href="${myCards[el].f_linked}" data-sm="true" data-field-name='Linked In'>
                                  <i class="fa-brands fa-linkedin-in"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bcard-cont">
                    <div class="bcard-sec-full">
                        <div class="bcard-temp-3bg">
                        </div>
                        <div class="bcard-padd">
                            <div class="bcard-frow-subsec">
                                <span class="bcard-btxt" name="f_company_name" data-field-name="Company Name" data-multiline="false">
                                    ${myCards[el].f_company_name}
                                </span>
                                
                            </div>
                            <a target="_blank" name="f_phone" href="tel:${myCards[el].f_phone}" data-sm="true" data-field-name='Phone No' class="bcard-frow-sec">
                                <div class="bcard-smico-sec">
                                    <i class="fa-solid fa-phone"></i>
                                </div>
                                <div class="bcard-sub-txt">
                                    ${myCards[el].f_phone}
                                </div>
                            </a>
                            <a target="_blank" name="f_website" href="${myCards[el].f_website}" data-sm="true" data-field-name='Website' class="bcard-frow-sec">
                                <div class="bcard-smico-sec">
                                    <i class="fa-solid fa-globe"></i>
                                </div>
                                <div class="bcard-sub-txt">
                                   ${myCards[el].f_website}
                                </div>
                            </a>
                            <a target="_blank" name="f_email" href="mailto:${myCards[el].f_email}" data-sm="true" data-field-name='Email' class="bcard-frow-sec">
                                <div class="bcard-smico-sec">
                                    <i class="fa-solid fa-envelope"></i>
                                </div>
                                <div class="bcard-sub-txt">
                                   ${myCards[el].f_email}
                                </div>
                            </a>
                            <a target="_blank" name="f_location" href="${myCards[el].f_location}" data-sm="true" data-field-name='Location' class="bcard-frow-sec">
                                <div class="bcard-smico-sec">
                                    <i class="fa-sharp fa-solid fa-location-dot"></i>
                                </div>
                                <div class="bcard-sub-txt">
                                    ${myCards[el].f_location}
                                </div>
                            </a>
                            <div class="bcard-ph-sec">
                                <div class="bcard-sec-btn">
                                    Add to Contacts
                                </div>
                                <a target="_blank" id="share_wa" class="bcard-sec-btn" href="#">
                                Share on Whatsapp
                            </a>
                            </div>
                        </div>
                    </div>
                    <div class="bcard-sec">
                        <a id="About">
                            <span class="bcard-btxt" name="f_about_title" data-field-name="About Title" data-multiline="false">
                               ${myCards[el].f_about_title}
                            </span>
                            <div class="bcard-sub-sec">
                                <div>
                                    <span class="bcard-sub-lbl" name="f_about_txt_1" data-field-name="About Section 1" data-multiline="false">
                                        ${myCards[el].f_about_txt_1}
                                    </span>
                                </div>
                                <div>
                                    <span class="bcard-sub-lbl" name="f_about_txt_2" data-field-name="About Section 2" data-multiline="true">
                                        ${myCards[el].f_about_txt_2}
                                    </span>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="bcard-sec">
                        <a id="Services">
                            <span class="bcard-btxt" name="f_services_title" data-field-name="Services Title" data-multiline="false">
                                ${myCards[el].f_services_title}
                            </span>
                            <div class="bcard-sub-sec">
                                <div>
                                    <span class="bcard-sub-lbl" name="f_services_txt_1" data-field-name="Services Section 1" data-multiline="false">
                                       ${myCards[el].f_services_txt_1}
                                    </span>
                                </div>
                                <div>
                                    <span class="bcard-sub-lbl" name="f_services_txt_2" data-field-name="Services Section 2" data-multiline="true">
                                        ${myCards[el].f_services_txt_2}
                                    </span>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="bcard-sec">
                        <a id="Enquiry">
                            <div class="bcard-btxt">
                                Contact Us
                            </div>
                            <div class="bcard-sub-sec">
                                <div class="bcard-frm-sec">
                                    <div class="bcard-frm-btxt">
                                        FirstName
                                    </div>
                                    <div class="bcard-frm-inpb">
                                        <input placeholder="FirstName" type="text" class="bcard-frm-inp" />
                                    </div>
                                </div>
                                <div class="bcard-inp-sec">
                                    <div class="bcard-frm-sec bcard-frm-half">
                                        <div class="bcard-frm-btxt">
                                            Mobile Number
                                        </div>
                                        <div class="bcard-frm-inpb">
                                            <input placeholder="Mobile No" type="text" class="bcard-frm-inp" />
                                        </div>
                                    </div>
                                    <div class="bcard-frm-sec bcard-frm-half">
                                        <div class="bcard-frm-btxt">
                                            Email
                                        </div>
                                        <div class="bcard-frm-inpb">
                                            <input placeholder="Email" type="text" class="bcard-frm-inp" />
                                        </div>
                                    </div>
                                </div>
                                <div class="bcard-frm-sec">
                                    <div class="bcard-frm-btxt">
                                        Message
                                    </div>
                                    <div class="bcard-frm-inpb">
                                        <input placeholder="Message" type="text" class="bcard-frm-inp" />
                                    </div>
                                </div>
                                <div class="bcard-btn">
                                    Submit
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="bcard-sec bcard-ft">
                        <span class="bcard-ft-btxt" name="f_address" data-field-name="Address" data-multiline="true">
                             ${myCards[el].f_address}
                        </span>
                        <span class="bcard-ft-btxt" name="f_phno" data-field-name="Contact" data-multiline="false">
                            ${myCards[el].f_phno}
                        </span>
                        <span class="bcard-ft-lbl" name="f_copyright" data-field-name="Copyright" data-multiline="false">
                             ${myCards[el].f_copyright}
                        </span>
                    </div>
                    <div class="bcard-copyrgt-ft">
                        Designed & Developed by
                        <div class="bcard-ft-logo">
                            <div class="bcard-ft-img">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bcard-opt-fix">
                <a href="#Home" class="bcard-opt">
                    <div class="bcard-opt-ico">
                        <i class="fa-solid fa-house-chimney"></i>
                    </div>
                    <div class="bcard-opt-txt">
                        Home
                    </div>
                </a>
                <a href="#About" class="bcard-opt">
                    <div class="bcard-opt-ico">
                        <i class="fa-solid fa-circle-info"></i>
                    </div>
                    <div class="bcard-opt-txt">
                        About
                    </div>
                </a>
                <a href="#Services" class="bcard-opt">
                    <div class="bcard-opt-ico">
                        <i class="fa-solid fa-hand-holding-hand"></i>
                    </div>
                    <div class="bcard-opt-txt">
                        Services
                    </div>
                </a>
                <a href="#Enquiry" class="bcard-opt">
                    <div class="bcard-opt-ico">
                        <i class="fa-solid fa-comment"></i>
                    </div>
                    <div class="bcard-opt-txt">
                        Enquiry
                    </div>
                </a>
            </div>
        </div>
        <style>
            :root {
                --primary: #3794e9;
                --primary-lt: #f1f8ff;
                --primary-dk:  #002f5a;
                --white:#ffffff;
                --gry-lt:  #f9f9f9;
                --gry: #efefef;
                --gry-dk:  #6e6e6e;
            }

            * {
                    margin: 0px;
                    padding: 0px;
                    box-sizing: border-box;
                }

                html {
                    font-size: 15px;
                }

                body {
                    padding: 0px;
                    margin: 0px;
                }

                .bcard-temp-3[data-theme="sp_001"]{
                    --primary:  #00d3d3;
                    --primary-dk: #006860;
                    --primary-lt:  #e8fffd;
                }
            </style>
                         `;
            let mycard_arr = ['sp_001', sp_001, myCards[el].user_template_name];
            loadEditTemplate(mycard_arr);
            console.log('e-sp001');
            break;


        } else if (templateName === 'ts_001') {

            let ts_001 = `
                        <div class="bcard-parent">
            <div class="bcard-box bcard-temp-4" data-theme="ts_001">
                <a id="Home"></a>
                <div class="bcard-profbox">
                    <div class="bcard-prof bcard-comp">
                        <img src="${myCards[el].f_company_img}" name="f_company_img" data-field-name="Company Logo" class="bcard-profimg bcard-compimg">
                    </div>
                    <div class="bcard-prof">
                        <img src="${myCards[el].f_prof_img}" name="f_prof_img" data-field-name="Profile" class="bcard-profimg">
                    </div>
                    <div class="bcard-prof-sec">
                        <div>
                            <span class="bcard-prof-btxt" name="f_prof_name" data-field-name="Profile Name" data-multiline="false">
                                ${myCards[el].f_prof_name}
                            </span>
                             <span class="bcard-prof-smtxt" name="f_prof_profession" data-field-name="Profession" data-multiline="false">
                                    ${myCards[el].f_prof_profession}
                            </span>
                        </div>
                    </div>
                    <div class="bcard-act">
                        <div class="bcard-acticon ico-fb">
                            <a target="_blank" name="f_fb" href="${myCards[el].f_fb}" data-sm="true" data-field-name='Facebook'>
                                <i class="fa-brands fa-facebook-f"></i>
                            </a>
                        </div>
                        <div class="bcard-acticon ico-whatsapp">
                            <a target="_blank" name="f_whatsapp" href="https://wa.me/${myCards[el].f_whatsapp}" data-sm="true" data-field-name='Whatsapp'>
                                <i class="fa-brands fa-whatsapp"></i>
                            </a>
                        </div>
                        <div class="bcard-acticon ico-insta">
                            <a target="_blank" name="f_insta" href="${myCards[el].f_insta}" data-sm="true" data-field-name='Instagram'>
                                <i class="fa-brands fa-instagram"></i>
                            </a>
                        </div>
                        <div class="bcard-acticon ico-tw">
                            <a target="_blank" name="f_twitter" href="${myCards[el].f_twitter}" data-sm="true" data-field-name='Twitter'>
                               <i class="fa-brands fa-twitter"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="bcard-cont">
                    <div class="bcard-sec">
                        <div class="bcard-padd">
                            <div class="bcard-frow-subsec">
                                <span class="bcard-btxt" name="f_company_name" data-field-name="Company Name" data-multiline="false">
                                    ${myCards[el].f_company_name}
                                </span>
                               
                            </div>
                            <a target="_blank" name="f_phone" href="tel:${myCards[el].f_phone}" data-sm="true" data-field-name='Phone No' class="bcard-frow-sec">
                                <div class="bcard-smico-sec">
                                    <i class="fa-solid fa-phone"></i>
                                </div>
                                <div class="bcard-sub-txt">
                                    ${myCards[el].f_phone}
                                </div>
                            </a>
                            <a target="_blank" name="f_website" href="${myCards[el].f_website}" data-sm="true" data-field-name='Website' class="bcard-frow-sec">
                                <div class="bcard-smico-sec">
                                    <i class="fa-solid fa-globe"></i>
                                </div>
                                <div class="bcard-sub-txt">
                                    ${myCards[el].f_website}
                                </div>
                            </a>
                            <a target="_blank" name="f_email" href="mailto:${myCards[el].f_email}" data-sm="true" data-field-name='Email' class="bcard-frow-sec">
                                <div class="bcard-smico-sec">
                                    <i class="fa-solid fa-envelope"></i>
                                </div>
                                <div class="bcard-sub-txt">
                                    ${myCards[el].f_email}
                                </div>
                            </a>
                            <a target="_blank" name="f_location" href="${myCards[el].f_location}" data-sm="true" data-field-name='Location' class="bcard-frow-sec">
                                <div class="bcard-smico-sec">
                                    <i class="fa-sharp fa-solid fa-location-dot"></i>
                                </div>
                                <div class="bcard-sub-txt">
                                    ${myCards[el].f_location}
                                </div>
                            </a>
                            <div class="bcard-ph-sec">
                                <div class="bcard-sec-btn">
                                    Add to Contacts
                                </div>
                                <a target="_blank" id="share_wa" class="bcard-sec-btn" href="#">
                                Share on Whatsapp
                            </a>
                            </div>
                        </div>
                    </div>
                    <div class="bcard-sec">
                        <a id="About">
                            <span class="bcard-btxt" name="f_about_title" data-field-name="About Title" data-multiline="false">
                                ${myCards[el].f_about_title}
                            </span>
                            <div class="bcard-sub-sec">
                                <div>
                                    <span class="bcard-sub-lbl" name="f_about_txt_1" data-field-name="About Section 1" data-multiline="false">
                                         ${myCards[el].f_about_txt_1}
                                    </span>
                                </div>
                                <div>
                                    <span class="bcard-sub-lbl" name="f_about_txt_2" data-field-name="About Section 2" data-multiline="true">
                                        ${myCards[el].f_about_txt_2}
                                    </span>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="bcard-sec">
                        <a id="Services">
                            <span class="bcard-btxt" name="f_services_title" data-field-name="Services Title" data-multiline="false">
                                ${myCards[el].f_services_title}
                            </span>
                            <div class="bcard-sub-sec">
                                <div>
                                    <span class="bcard-sub-lbl" name="f_services_txt_1" data-field-name="Services Section 1" data-multiline="false">
                                        ${myCards[el].f_services_txt_1}
                                    </span>
                                </div>
                                <div>
                                    <span class="bcard-sub-lbl" name="f_services_txt_2" data-field-name="Services Section 2" data-multiline="true">
                                        ${myCards[el].f_services_txt_2}
                                    </span>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="bcard-sec">
                        <a id="Products">
                            <span class="bcard-btxt" name="f_products_title" data-field-name="Products Title" data-multiline="false">
                                ${myCards[el].f_products_title}
                            </span>
                            <div class="bcard-prod-cont">
                                <div class="bcard-prod-imgb">
                                    <img class="bcard-prod-img" name="f_prod_img1" data-field-name="Watches" src='${myCards[el].f_prod_img1}' />
                                </div>
                                <div class="bcard-prod-imgb">
                                    <img class="bcard-prod-img" name="f_prod_img2" data-field-name="Smart Watches" src='${myCards[el].f_prod_img2}' />
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="bcard-sec">
                        <a id="Enquiry">
                            <div class="bcard-btxt">
                                Contact Us
                            </div>
                            <div class="bcard-sub-sec">
                                <div class="bcard-frm-sec">
                                    <div class="bcard-frm-btxt">
                                        FirstName
                                    </div>
                                    <div class="bcard-frm-inpb">
                                        <input placeholder="FirstName" type="text" class="bcard-frm-inp" />
                                    </div>
                                </div>
                                <div class="bcard-inp-sec">
                                    <div class="bcard-frm-sec bcard-frm-half">
                                        <div class="bcard-frm-btxt">
                                            Mobile Number
                                        </div>
                                        <div class="bcard-frm-inpb">
                                            <input placeholder="Mobile No" type="text" class="bcard-frm-inp" />
                                        </div>
                                    </div>
                                    <div class="bcard-frm-sec bcard-frm-half">
                                        <div class="bcard-frm-btxt">
                                            Email
                                        </div>
                                        <div class="bcard-frm-inpb">
                                            <input placeholder="Email" type="text" class="bcard-frm-inp" />
                                        </div>
                                    </div>
                                </div>
                                <div class="bcard-frm-sec">
                                    <div class="bcard-frm-btxt">
                                        Message
                                    </div>
                                    <div class="bcard-frm-inpb">
                                        <input placeholder="Message" type="text" class="bcard-frm-inp" />
                                    </div>
                                </div>
                                <div class="bcard-btn">
                                    Submit
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="bcard-sec bcard-ft">
                        <span class="bcard-ft-btxt" name="f_address" data-field-name="Address" data-multiline="true">
                            ${myCards[el].f_address}
                        </span>
                        <span class="bcard-ft-btxt" name="f_phno" data-field-name="Contact" data-multiline="false">
                            ${myCards[el].f_phno}
                        </span>
                        <span class="bcard-ft-lbl" name="f_copyright" data-field-name="Copyright" data-multiline="false">
                           ${myCards[el].f_copyright}
                        </span>
                    </div>
                    <div class="bcard-copyrgt-ft">
                        Designed & Developed by
                        <div class="bcard-ft-logo">
                            <div class="bcard-ft-img">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bcard-opt-fix">
                <a href="#Home" class="bcard-opt">
                    <div class="bcard-opt-ico">
                        <i class="fa-solid fa-house-chimney"></i>
                    </div>
                    <div class="bcard-opt-txt">
                        Home
                    </div>
                </a>
                <a href="#About" class="bcard-opt">
                    <div class="bcard-opt-ico">
                        <i class="fa-solid fa-circle-info"></i>
                    </div>
                    <div class="bcard-opt-txt">
                        About
                    </div>
                </a>
                <a href="#Services" class="bcard-opt">
                    <div class="bcard-opt-ico">
                        <i class="fa-solid fa-hand-holding-hand"></i>
                    </div>
                    <div class="bcard-opt-txt">
                        Services
                    </div>
                </a>
                <a href="#Enquiry" class="bcard-opt">
                    <div class="bcard-opt-ico">
                        <i class="fa-solid fa-comment"></i>
                    </div>
                    <div class="bcard-opt-txt">
                        Enquiry
                    </div>
                </a>
            </div>
        </div>
        <style>
            :root {
                --primary: #3794e9;
                --primary-lt: #f1f8ff;
                --primary-dk:  #002f5a;
                --white:#ffffff;
                --gry-lt:  #f9f9f9;
                --gry: #efefef;
                --gry-dk:  #6e6e6e;
            }

            * {
            margin: 0px;
            padding: 0px;
            box-sizing: border-box;
            }

            html {
                font-size: 15px;
            }

            body {
                padding: 0px;
                margin: 0px;
            }

            .bcard-temp-4[data-theme="ts_001"]{
                --primary: #f58646;
                --primary-dk: #BA4605;
                --primary-lt: #FFF5EF;
            }
            </style>
                         `;
            let mycard_arr = ['ts_001', ts_001, myCards[el].user_template_name];
            loadEditTemplate(mycard_arr);
            break;

        }
        else if (templateName === 'wt_001') {
            let wt_001 = `
                         <div>
            <div class="wt-head">
                <div class="wt-hlogo">
                    <img src="${myCards[el].f_logo_1}" name="f_logo_1" data-field-name="Logo" class="wt-hlogo-img">
                </div>
                <div class="wt-burg" onclick="openLinkNav(this);">
                    <div class="wt-burg-line"></div>
                </div>
                <div class="wt-hlnks">
                    <div class="wt-hlnk" id="home" onclick="loadLink(this)">
                        <img class="wt-lnk-ico" src="../../images/house-solid.svg">
                        <div>
                            Home    
                        </div>
                        
                    </div>
                    <div class="wt-hlnk" id="services" onclick="loadLink(this)">
                        <img class="wt-lnk-ico" src="../../images/handshake.svg">
                        <div>
                            Services    
                        </div>
                    </div>
                    <div class="wt-hlnk" id="about" onclick="loadLink(this)">
                        <img class="wt-lnk-ico" src="../../images/circle-info.svg">
                        <div>
                            About    
                        </div>
                        
                    </div>
                    <div class="wt-hlnk" id="contact" onclick="loadLink(this)">
                        <img class="wt-lnk-ico" src="../../images/phone-solid.svg">
                        <div>
                            Contact    
                        </div>
                        
                    </div>
                    <div class="wt-hlnk-close" onclick="openLinkNav(this);">
                    </div>
                </div>
            </div>
            <div class="wt-parent-sec" id="main_sec">
                <div class="wt-container">
                    <div class="wt-sec wt-sec-center">
                        <div class="wt-sec-box">
                            <span class="wt-lg-txt wt-xlg-txt" name="f_title_1" data-field-name="Title" data-multiline="false">
                                ${myCards[el].f_title_1}
                            </span>
                            <span class="wt-sub-txt wt-xsub-txt" name="f_des_1" data-field-name="Description" data-multiline="true">
                                 ${myCards[el].f_des_1}
                            </span>
                            <span class="wt-btn" name="f_btn_1" data-field-name="Button" data-multiline="false">
                                ${myCards[el].f_btn_1}
                            </span>
                        </div>
                        <div class="wt-sec-box">
                            <div class="wt-sec-imgb">
                                <img src="${myCards[el].f_hero_1}" name="f_hero_1" data-field-name="Hero Image" class="wt-sec-img">
                            </div>
                        </div>
                    </div>
                    <div class="wt-sec-padd wt-lt-bg">
                        <div class="wt-sec-title">
                            Features
                        </div>
                        <div class="wt-fea-sec">
                            <div class="wt-fea-cont">
                                <div class="wt-fea-box">
                                    <div class="wt-fea-icob">
                                        <img src="${myCards[el].f_feature_icon__1}" name="f_feature_icon__1" data-field-name="Feature Icon 1" class="wt-fea-icon">
                                    </div>
                                    <span class="wt-lg-txt" name="f_feature_title__1" data-field-name="Feature Title 1" data-multiline="false">
                                        ${myCards[el].f_feature_title__1}
                                    </span>
                                    <span class="wt-sub-txt" name="f_feature_des__1" data-field-name="Feature Description 1" data-multiline="true">
                                        ${myCards[el].f_feature_des__1}
                                    </span>
                                </div>
                                <div class="wt-fea-bg"></div>
                            </div>
                            <div class="wt-fea-cont">
                                <div class="wt-fea-box">
                                    <div class="wt-fea-icob">
                                        <img src="${myCards[el].f_feature_icon__2}" name="f_feature_icon__2" data-field-name="Feature Icon 2" class="wt-fea-icon">
                                    </div>
                                    <span class="wt-lg-txt" name="f_feature_title__2" data-field-name="Feature Title 2" data-multiline="false">
                                        ${myCards[el].f_feature_title__2}
                                    </span>
                                    <span class="wt-sub-txt" name="f_feature_des__2" data-field-name="Feature Description 2" data-multiline="true">
                                        ${myCards[el].f_feature_des__2}
                                    </span>
                                </div>
                                <div class="wt-fea-bg"></div>
                            </div>
                            <div class="wt-fea-cont">
                                <div class="wt-fea-box">
                                    <div class="wt-fea-icob">
                                        <img src="${myCards[el].f_feature_icon__3}" name="f_feature_icon__3" data-field-name="Feature Icon 3" class="wt-fea-icon">
                                    </div>
                                    <span class="wt-lg-txt" name="f_feature_title__3" data-field-name="Feature Title 3" data-multiline="false">
                                       ${myCards[el].f_feature_title__3}
                                    </span>
                                    <span class="wt-sub-txt" name="f_feature_des__3" data-field-name="Feature Description 3" data-multiline="true">
                                        ${myCards[el].f_feature_des__3}
                                    </span>
                                </div>
                                <div class="wt-fea-bg"></div>
                            </div>
                            <div class="wt-fea-cont">
                                <div class="wt-fea-box">
                                    <div class="wt-fea-icob">
                                        <img src="${myCards[el].f_feature_icon__4}" name="f_feature_icon__4" data-field-name="Feature Icon 4" class="wt-fea-icon">
                                    </div>
                                    <span class="wt-lg-txt" name="f_feature_title__4" data-field-name="Feature Title 4" data-multiline="false">
                                       ${myCards[el].f_feature_title__4}
                                    </span>
                                    <span class="wt-sub-txt" name="f_feature_des__4" data-field-name="Feature Description 4" data-multiline="true">
                                       ${myCards[el].f_feature_des__4}
                                    </span>
                                </div>
                                <div class="wt-fea-bg"></div>
                            </div>
                            <div class="wt-fea-cont">
                                <div class="wt-fea-box">
                                    <div class="wt-fea-icob">
                                        <img src="${myCards[el].f_feature_icon__5}" name="f_feature_icon__5" data-field-name="Feature Icon 5" class="wt-fea-icon">
                                    </div>
                                    <span class="wt-lg-txt" name="f_feature_title__5" data-field-name="Feature Title 5" data-multiline="false">
                                        ${myCards[el].f_feature_title__5}
                                    </span>
                                    <span class="wt-sub-txt" name="f_feature_des__5" data-field-name="Feature Description 5" data-multiline="true">
                                       ${myCards[el].f_feature_des__5}
                                    </span>
                                </div>
                                <div class="wt-fea-bg"></div>
                            </div>
                            <div class="wt-fea-cont">
                                <div class="wt-fea-box">
                                    <div class="wt-fea-icob">
                                        <img src="${myCards[el].f_feature_icon__6}" name="f_feature_icon__6" data-field-name="Feature Icon 6" class="wt-fea-icon">
                                    </div>
                                    <span class="wt-lg-txt" name="f_feature_title__6" data-field-name="Feature Title 6" data-multiline="false">
                                        ${myCards[el].f_feature_title__6}
                                    </span>
                                    <span class="wt-sub-txt" name="f_feature_des__6" data-field-name="Feature Description 6" data-multiline="true">
                                         ${myCards[el].f_feature_des__6}
                                    </span>
                                </div>
                                <div class="wt-fea-bg"></div>
                            </div>
                        </div>
                    </div>
                    <div class="wt-sec-padd">
                        <div class="wt-sec wt-sec-rev">
                            <div class="wt-sec-box">
                                <div class="wt-sec-imgb">
                                    <img src="${myCards[el].f_sec_img__1}" name="f_sec_img__1" data-field-name="Section Image 1" class="wt-sec-img">
                                </div>
                                <div class="wt-img-bg">
                                </div>
                            </div>
                            <div class="wt-sec-box">
                                <span class="wt-lg-txt" name="f_sec_title__1" data-field-name="Section Title 1" data-multiline="false">
                                    ${myCards[el].f_sec_title__1}
                                </span>
                                <div>
                                    <span class="wt-sub-txt wt-point" name="f_sec_des__1" data-field-name="Description Title 1" data-multiline="true">
                                        ${myCards[el].f_sec_des__1}
                                    </span>
                                    <span class="wt-sub-txt wt-point" name="f_sec_des__2" data-field-name="Description Title 2" data-multiline="true">
                                        ${myCards[el].f_sec_des__2}
                                    </span>
                                    <span class="wt-sub-txt wt-point" name="f_sec_des__3" data-field-name="Description Title 3" data-multiline="true">
                                        ${myCards[el].f_sec_des__3}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="wt-parent-sec dn" id="services_sec">
                <div class="wt-sec-padd ">
                    <div class="wt-sec-title">
                        Services We Offer
                    </div>
                    <div>
                        <div class="wt-service-sec">
                            <div class="wt-serv-box">
                                <div class="wt-fea-icob">
                                    <img src="${myCards[el].f_service_icon__1}" name="f_service_icon__1" data-field-name="Services Icon 1" class="wt-fea-icon">
                                </div>
                                <div class="wt-serv-subsec">
                                    <span class="wt-lg-txt" name="f_service_title__1" data-field-name="Services Title 1" data-multiline="false">
                                        ${myCards[el].f_service_title__1}
                                    </span>
                                    <span class="wt-sub-txt" name="f_service_des__1" data-field-name="Services Description 1" data-multiline="true">
                                        ${myCards[el].f_service_des__1}
                                    </span>
                                </div>
                            </div>
                            <div class="wt-serv-box">
                                <div class="wt-fea-icob">
                                    <img src="${myCards[el].f_service_icon__2}" name="f_service_icon__2" data-field-name="Services Icon 2" class="wt-fea-icon">
                                </div>
                                <div class="wt-serv-subsec">
                                    <span class="wt-lg-txt" name="f_service_title__2" data-field-name="Services Title 2" data-multiline="false">
                                        ${myCards[el].f_service_title__2}
                                    </span>
                                    <span class="wt-sub-txt" name="f_service_des__2" data-field-name="Services Description 2" data-multiline="true">
                                        ${myCards[el].f_service_des__2}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="wt-service-sec">
                            <div class="wt-serv-box">
                                <div class="wt-fea-icob">
                                    <img src="${myCards[el].f_service_icon__3}" name="f_service_icon__3" data-field-name="Services Icon 3" class="wt-fea-icon">
                                </div>
                                <div class="wt-serv-subsec">
                                    <span class="wt-lg-txt" name="f_service_title__3" data-field-name="Services Title 3" data-multiline="false">
                                        ${myCards[el].f_service_title__3}
                                    </span>
                                    <span class="wt-sub-txt" name="f_service_des__3" data-field-name="Services Description 3" data-multiline="true">
                                        ${myCards[el].f_service_des__3}
                                    </span>
                                </div>
                            </div>
                            <div class="wt-serv-box">
                                <div class="wt-fea-icob">
                                    <img src="${myCards[el].f_service_icon__4}" name="f_service_icon__4" data-field-name="Services Icon 4" class="wt-fea-icon">
                                </div>
                                <div class="wt-serv-subsec">
                                    <span class="wt-lg-txt" name="f_service_title__4" data-field-name="Services Title 4" data-multiline="false">
                                        ${myCards[el].f_service_title__4}
                                    </span>
                                    <span class="wt-sub-txt" name="f_service_des__4" data-field-name="Services Description 4" data-multiline="true">
                                        ${myCards[el].f_service_des__4}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="wt-parent-sec dn" id="contact_sec">
                <div class="wt-contact">
                    <div class="bcard-sec">
                        <div class="wt-sec-title">
                            Contact Us
                        </div>
                        <div class="bcard-sub-sec">
                            <div class="bcard-frm-sec">
                                <div class="bcard-frm-btxt">
                                    FirstName
                                </div>
                                <div class="bcard-frm-inpb">
                                    <input placeholder="FirstName" type="text" class="bcard-frm-inp" />
                                </div>
                            </div>
                            <div class="bcard-inp-sec">
                                <div class="bcard-frm-sec bcard-frm-half">
                                    <div class="bcard-frm-btxt">
                                        Mobile Number
                                    </div>
                                    <div class="bcard-frm-inpb">
                                        <input placeholder="Mobile No" type="text" class="bcard-frm-inp" />
                                    </div>
                                </div>
                                <div class="bcard-frm-sec bcard-frm-half">
                                    <div class="bcard-frm-btxt">
                                        Email
                                    </div>
                                    <div class="bcard-frm-inpb">
                                        <input placeholder="Email" type="text" class="bcard-frm-inp" />
                                    </div>
                                </div>
                            </div>
                            <div class="bcard-frm-sec">
                                <div class="bcard-frm-btxt">
                                    Message
                                </div>
                                <div class="bcard-frm-inpb">
                                    <input placeholder="Message" type="text" class="bcard-frm-inp" />
                                </div>
                            </div>
                            <div class="bcard-btn">
                                Submit
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="wt-parent-sec dn" id="about_sec">
                <div class="wt-sec-title">
                    About Us
                </div>
                <div class="wt-sec ">
                    <div class="wt-sec-box">
                        <span class="wt-lg-txt wt-xlg-txt" name="f_title_2" data-field-name="Title" data-multiline="false">
                           ${myCards[el].f_title_2}
                        </span>
                        <span class="wt-sub-txt wt-xsub-txt" name="f_des_2" data-field-name="Description" data-multiline="true">
                             ${myCards[el].f_des_2}
                        </span>
                        <span class="wt-sub-txt wt-xsub-txt" name="f_des_3" data-field-name="Description" data-multiline="true">
                            ${myCards[el].f_des_3}
                        </span>
                        <div>
                            <span class="wt-sub-txt wt-point" name="f_sec_des__4" data-field-name="Description Title 4" data-multiline="true">
                                ${myCards[el].f_sec_des__4}
                            </span>
                            <span class="wt-sub-txt wt-point" name="f_sec_des__5" data-field-name="Description Title 5" data-multiline="true">
                                ${myCards[el].f_sec_des__5}
                            </span>
                            <span class="wt-sub-txt wt-point" name="f_sec_des__6" data-field-name="Description Title 6" data-multiline="true">
                                ${myCards[el].f_sec_des__6}
                            </span>
                        </div>
                    </div>
                    <div class="wt-sec-box">
                        <div class="wt-sec-imgb">
                            <img src="${myCards[el].f_hero_2}" name="f_hero_2" data-field-name="About Image 1" class="wt-sec-img">
                             <div class="wt-img-bg2">
                            </div>
                        </div>
                        <div class="wt-sec-imgb wt-sec-imgb-2">
                            <img src="${myCards[el].f_hero_3}" name="f_hero_3" data-field-name="About Image 2" class="wt-sec-img">
                             <div class="wt-img-bg3">
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
            <div class="wt-ft">
                <div class="wt-ft-sec">
                    <div class="wt-hlogo">
                        <img src="${myCards[el].f_logo_2}" name="f_logo_2" data-field-name="Logo" class="wt-hlogo-img">
                    </div>
                    <div class="wt-ft-subsec">
                        <div class="wt-hlnk" id="home" onclick="loadLink(this)">
                            Home
                        </div>
                        <div class="wt-hlnk" id="services" onclick="loadLink(this)">
                            Services
                        </div>
                        <div class="wt-hlnk" id="about" onclick="loadLink(this)">
                            About
                        </div>
                        <div class="wt-hlnk" id="contact" onclick="loadLink(this)">
                            Contact
                        </div>
                    </div>
                    <div class="wt-ft-subsec">
                            <div class="wt-ft-secrow">
                                <i class="fa-solid fa-location-dot"></i>
                                <span class="wt-sub-txt" name="f_address" data-field-name="Company Address" data-multiline="true">
                                   ${myCards[el].f_address}
                                </span>
                            </div>
                            <a target="_blank" name="f_email" href="mailto:johndoe123@gmail.com" data-sm="true" data-field-name="Company Email" class="wt-ft-secrow">
                                <i class="fa-solid fa-envelope"></i>
                                <div>
                                   ${myCards[el].f_email}  
                                </div>
                            </a>
                            <a target="_blank" name="f_ph" href="tel:4353446456544" data-sm="true" data-field-name="Company Contact No" class="wt-ft-secrow">
                               <i class="fa-solid fa-phone"></i>
                               <div>
                                    ${myCards[el].f_ph}  
                               </div>
                            </a>
                    </div>
                </div>
                <span class="wt-ft-txt" name="f_copyrgt_txt" data-field-name="Copyright " data-multiline="false">
                    ${myCards[el].f_copyrgt_txt}
                </span>
            </div>
        </div>
        <style>
            :root {
                --primary: #3794e9;
                --primary-lt: #f1f8ff;
                --primary-dk:  #002f5a;
                --white:#ffffff;
                --gry-lt:  #f9f9f9;
                --gry: #efefef;
                --gry-dk:  #6e6e6e;
            }

            * {
                margin: 0px;
                padding: 0px;
                box-sizing: border-box;
            }

            html {
                font-size: 15px;
            }

            body {
                padding: 0px;
                margin: 0px;
            }

            .bcard-temp-4[data-theme="ts_001"]{
                --primary: #f58646;
                --primary-dk: #BA4605;
                --primary-lt: #FFF5EF;
            }
            </style>
        <script type="text/javascript">
        function loadLink(e) {
            let links = document.querySelectorAll('.wt-hlnk');
            for (let j = 0; j < links.length; j++) {
                links[j].classList.remove('wt-lactive');
            }
            console.log(document.querySelectorAll('.wt-hlnk'));
            console.log(event.currentTarget)
            event.currentTarget.classList.add('wt-lactive');
            if (event.currentTarget.attributes[1].value === 'contact') {
                document.getElementById('contact_sec').classList.remove('dn');

                document.getElementById('main_sec').classList.add('dn');
                document.getElementById('services_sec').classList.add('dn');
                document.getElementById('about_sec').classList.add('dn');

            } else if (event.currentTarget.attributes[1].value === 'home') {
                document.getElementById('main_sec').classList.remove('dn');

                document.getElementById('contact_sec').classList.add('dn');
                document.getElementById('services_sec').classList.add('dn');
                document.getElementById('about_sec').classList.add('dn');
            } else if (event.currentTarget.attributes[1].value === 'services') {
                document.getElementById('services_sec').classList.remove('dn');

                document.getElementById('contact_sec').classList.add('dn');
                document.getElementById('main_sec').classList.add('dn');
                document.getElementById('about_sec').classList.add('dn');
            } else if (event.currentTarget.attributes[1].value === 'about') {
                document.getElementById('about_sec').classList.remove('dn');

                document.getElementById('contact_sec').classList.add('dn');
                document.getElementById('main_sec').classList.add('dn');
                document.getElementById('services_sec').classList.add('dn');
            }

        }
        function openLinkNav(e) {
            $('.wt-hlnks').toggleClass('df');
        }
        </script>
                        `;
            let mycard_arr = ['wt_001', wt_001, myCards[el].user_template_name];
            loadEditTemplate(mycard_arr);
            break;
        }
      }   
    }

}

function findTemplate(currentMenuName) {
    // localStorage.setItem("temp_name", currentMenuName);

    // let currentMenuName = tempNameValue;
    let activeMenuListingConcat = '';

    // console.log(event.currentTarget);
    $.each(tempMenu, (menuKeys, templateValues) => {
        // console.log(templateValues.menus);
        for (let i = 0; i < templateValues.menus.length; i++) {
            let tempMenu = templateValues.menus;


            if (tempMenu[i].name == currentMenuName) {

                // console.log(tempMenu[i].templates_list); 
                $.each(tempMenu[i].templates_list, (templateListInd, templateListVal) => {
                    $.each(templateDetails, (templateDetailIndex, templateDetailValues) => {
                        if (templateDetailValues.id === templateListVal) {
                            // console.log(templateDetailValues);
                            let activeMenuListing = `
                                                <div class="abc-temp" name="${templateDetailValues.id}" onclick="loadEditTemplate(this.attributes.name.value);">
                                                    <div class="abc-temp-img">
                                                        <img src="../../images/${templateDetailValues.screen_thumb}" class="abc-temp-ico">
                                                    </div>
                                                    <div class="abc-temp-lbl">
                                                        ${templateDetailValues.display_name}
                                                    </div>
                                                    <div class="abc-temp-ft">
                                                        <div class="abc-gbtn abc-prim-btn" name="${templateDetailValues.id}" onclick="loadEditTemplate(this.attributes.name.value);">
                                                            Edit
                                                        </div>
                                                        <div class="abc-gbtn abc-sec-btn" id="template_prev" onclick="loadTemplatePreview(this);">
                                                            Preview                            
                                                        </div>
                                                    </div>

                                                </div>
                                                `;
                            activeMenuListingConcat += activeMenuListing;

                        }

                    });
                });
                //Adding Template Listing
                let menuListingSection = `<div class="abc-temp-sec">
                    
                                                        <div class="abc-head-lbl">
                                                            ${tempMenu[i].title}
                                                        </div>
                                                        <div class="abc-temp-box">

                                                            ${activeMenuListingConcat}

                                                        </div>
                                                    </div>`;
                // console.log(activeMenuListing);
                $("#template_listing").children().remove();
                $("#template_listing").append(menuListingSection);
                $("#template_listing").removeClass("abc-trans-lft0");

                setTimeout(() => {
                    $("#template_listing").addClass("abc-trans-lft0");
                }, 200);
            }
        }
    });
}

function loadLeftNavMenu() {

    $.each(tempMenu, (key, mainMenu) => {
        // console.log(key + "-" , mainMenu);
        subMenuLg = '';
        $.each(mainMenu.menus, (vk, vv) => {
            subMenu = `  <li class="abc-lnav-subli">
                                <div class="abc-lnav-smenu" name="${vv.name}" onclick="${vv.on_click}">
                                    <div class="abc-menu-sec">
                                        <div class="abc-menu-img">
                                            <i class="abc-menu-ico ${vv.icon}"></i>
                                        </div>
                                        <div class="abc-menu-lbl">
                                            ${vv.title}
                                        </div>
                                    </div>
                                </div>
                            </li>`;
            subMenuLg += subMenu;
        });

        if (Object.keys(mainMenu.menus).length !== 0) {

            mainNavMenu = `<li class="abc-lnav-li">
                        <div class="abc-lnav-menu" name="${mainMenu.name}">
                            <div class="abc-menu-sec">
                                <div class="abc-menu-lbl">
                                    ${mainMenu.title}
                                </div>
                            </div>
                            
                        </div>
                        <ul class="">
                            ${subMenuLg}

                        </ul>

                    </li>`;
        } else if (Object.keys(mainMenu.menus).length == 0) {

            mainNavMenu = `<li class="abc-lnav-li">
                        <div class="abc-lnav-menu" name="${mainMenu.name}" onclick="${mainMenu.on_click}">
                            <div class="abc-menu-sec">
                                <div class="abc-menu-lbl">
                                    ${mainMenu.title}
                                </div>
                            </div>
                        </div>
                        <ul class="">
                            ${subMenuLg}

                        </ul>

                    </li>`;
        }

        $("#abc_left_nav").append(mainNavMenu);
    });

    $('.abc-lnav-smenu:first').addClass('abc-smenu-on');
    findTemplate('professional-services');
}

function generateFields(textContent, tagName, currentElement) {
    fldName = $(currentElement).attr("data-field-name");
    // tid = $(currentElement).attr("data-tid");
    // fid = $(currentElement).attr("data-fid");
    mlId = $(currentElement).attr("data-multiline");
    nameId = $(currentElement).attr("name");

    formFoot = `
                <div class="abc-edit-foot">
                    <div class="abc-gbtn abc-red-btn" onclick=goBack();>
                        Cancel
                    </div>
                    <div class="abc-gbtn abc-sec-btn" name="my_cards" onclick=sendFormData(this);>
                        Submit
                    </div>
                </div>
                `;

    // console.log(tagName);
    if (tagName == 'SPAN') {
        if (mlId === 'false') {

            let field_detail = { 'type': 'VARCHAR', 'model': nameId, 'length': '150' };

            elArrayFields.push(field_detail);

            formField = `  <div class="abc-fld-box">
                                <div class="abc-fld-lbl">
                                    ${fldName}
                                </div>
                                <div class="abc-fld-inpb">
                                    <input class="abc-ginp" name="${nameId}" value="${textContent}" type="text"  placeholder="${fldName}" autocomplete='off' maxlength="150"/>
                                </div>
                            </div>`;
        } else if (mlId === 'true') {
            let field_detail = { 'type': 'LONGTEXT', 'model': nameId };
            elArrayFields.push(field_detail);

            formField = `  <div class="abc-fld-box">
                                <div class="abc-fld-lbl">
                                     ${fldName}
                                </div>
                                <div class="abc-fld-inpb">
                                    <textarea class="abc-gml" name="${nameId}" value="${textContent}" placeholder="${fldName}" autocomplete='off' maxlength="5000">${textContent.trim()}</textarea>
                                </div>
                            </div>`;
        }

        $("#abc_edit_form").append(formField);

    } else if (tagName == 'IMG') {
        // imgSrc = $(currentElement).attr("src");
        let field_detail = {
            'type': 'VARCHAR',
            'model': nameId,
            'length': '150'
        }
        elArrayFields.push(field_detail);

        imgField = `<div class="abc-fld-box">
                                <div class="abc-fld-lbl">
                                    ${fldName}
                                </div>
                                <div class="abc-fld-inpb">
                                    <div class="abc-fld-subsec">
                                        <div class="abc-fld-prof">
                                            <img src="${textContent}" name="${nameId}" class="abc-fld-profimg" />
                                        </div>
                                        <div class="abc-gbtn abc-sec-btn" onclick="uploadImage(this);">
                                            <input type="file" accept="image/jpeg, image/jpg"/>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
        $("#abc_edit_form").append(imgField);

    } else if (tagName == 'A' && $(currentElement).attr("name") !== true && typeof($(currentElement).attr("name")) !== 'undefined') {
        // console.log($(currentElement).attr('data-sm'));
        if ($(currentElement).attr('data-sm') === 'true') {

            // console.log($(currentElement).children('.bcard-smico-sec').html());
            // console.log($(currentElement).find('i')[0].outerHTML);


            if ($(currentElement).attr('href').substring(0, 4) === 'tel:') {
                let field_detail = {
                    'type': 'VARCHAR',
                    'model': $(currentElement).attr('name'),
                    'length': '150'
                }
                elArrayFields.push(field_detail);

                socialPlatformField = `<div class="abc-fld-subsec">
                        <div class="abc-fld-icob">
                            ${$(currentElement).find('i')[0].outerHTML}
                        </div>
                        <input type="number" name="${$(currentElement).attr('name')}" value="${$(currentElement).attr('href').substring(5)}" class="abc-ginp" autocomplete='off' maxlength="150"/>
                    </div>`;
            } else if ($(currentElement).attr('href').substring(0, 7) === 'mailto:') {
                let field_detail = {
                    'type': 'VARCHAR',
                    'model': $(currentElement).attr('name'),
                    'length': '150'
                }
                elArrayFields.push(field_detail);
                console.log($(currentElement))
                socialPlatformField = `<div class="abc-fld-subsec">
                        <div class="abc-fld-icob">
                            ${$(currentElement).find('i')[0].outerHTML}
                        </div>
                        <input type="email" name="${$(currentElement).attr('name')}" value="${$(currentElement).attr('href').substring(7)}" class="abc-ginp" autocomplete='off' maxlength="150"/>
                    </div>`;
            } else if ($(currentElement).attr('href').substring(0, 14) === 'https://wa.me/') {
                let field_detail = {
                    'type': 'VARCHAR',
                    'model': $(currentElement).attr('name'),
                    'length': '150'
                }
                elArrayFields.push(field_detail);

                socialPlatformField = `<div class="abc-fld-subsec">
                        <div class="abc-fld-icob">
                            ${$(currentElement).find('i')[0].outerHTML}
                        </div>
                        <input type="number" name="${$(currentElement).attr('name')}" value="${$(currentElement).attr('href').substring(15)}" class="abc-ginp" autocomplete='off' maxlength="150"/>
                    </div>`;
            } else {
                let field_detail = {
                    'type': 'VARCHAR',
                    'model': $(currentElement).attr('name'),
                    'length': '150'
                }
                elArrayFields.push(field_detail);

                socialPlatformField = `<div class="abc-fld-subsec">
                        <div class="abc-fld-icob">
                            ${$(currentElement).find('i')[0].outerHTML}
                        </div>
                        <input type="text" name="${$(currentElement).attr('name')}" value="${$(currentElement).attr('href')}" class="abc-ginp" autocomplete='off' maxlength="150"/>
                    </div>`;
            }

            // socialPlatformGroupFields += socialPlatformField;
            // console.log(socialPlatformGroupFields);

            aFieldSec = `<div class="abc-fld-box">
                                    <div class="abc-fld-lbl">
                                      ${$(currentElement).attr('data-field-name')} - Link
                                    </div>
                                    <div class="abc-fld-inpb" >
                                        ${socialPlatformField}
                                    </div>
                                </div>
                                `;

            $("#abc_edit_form").append(aFieldSec);
            // console.log(aFieldSec);
        }

    }
    // console.log($(currentElement).attr("name"));
    // console.log(currentElement);
    //     if(jQuery.inArray($(currentElement).attr("name"), linksGroupName) === -1) {
    //         linksGroupName.push($(currentElement).attr("name"));  
    //         linksGroupElements.push(currentElement);
    //         console.log(linksGroupName);
    //         console.log(linksGroupElements);
    //     }
    //     else {
    //         findTemplateLinksInserted = true;
    //         if(findTemplateLinksInserted === true) {
    //             console.log("LINK FIELD ADDED");

    //             $.each(linksGroupElements, (linkGroupElKey, linkGroupElVal) => {

    //                 // console.log(linkGroupElVal);
    //                 socialPlatformField = `<div class="abc-fld-subsec">
    //                                             <div class="abc-fld-icob">
    //                                                 <img src="" class="abc-fld-ico">
    //                                             </div>
    //                                             <input type="text" name="${linkGroupElVal.name}" value="${linkGroupElVal.href}" class="abc-ginp" />
    //                                         </div>`;
    //                 socialPlatformGroupFields += socialPlatformField;
    //             // console.log(socialPlatformGroupFields);

    //             });

    //         // console.log(socialPlatformGroupFields);
    //         aFieldSec = `<div class="abc-fld-box">
    //                                 <div class="abc-fld-lbl">
    //                                     Social Platforms
    //                                 </div>
    //                                 <div class="abc-fld-inpb" >
    //                                     ${socialPlatformGroupFields}
    //                                 </div>
    //                             </div>`;

    //         $("#abc_edit_form").append(aFieldSec);
    //         // console.log(linksGroupElements);
    //         }

    //         // linksGroupName=[];
    //         // console.log(linksGroupElements);
    //         // console.log(linksGroupName);
    //     }
    //     findTemplateLinksInserted = false;

    // }
    // console.log(textContent, tagName);
    // socialPlatformGroupFields = [];
    // linksGroupElements = [];            

}

function goBack() {
    // localStorage.removeItem("template_id");

    elArray = [];
    elArrayFields = [];
    formSubmitVals = [];
    tempFormData = {};

    $("#template_listing").removeClass("dn");
    $("#abc_general_body").removeClass("abc-edit-gbody");
    $("#edit_template").children().remove();
    $("#edit_template").addClass("dn");
    $("#abc_edit_form").children().remove();
    $("#page_title").text("Templates");
    socialPlatformGroupFields = [];
}

function loadEditTemplate(tid) {
    event.stopPropagation();

    if (Array.isArray(tid)) {
        cTid = tid[0];
        cTemplate = tid[1];
        tempCopy = cTemplate;
        currentTemplateId = '#' + tid[0];
        window.location.replace(currentTemplateId);
    } else {
        cTid = tid;
        currentTemplateId = "#" + tid;
        tempCopy = $(currentTemplateId).html();

        window.location.replace(currentTemplateId);
    }

    editTemplatePreview(tid);


}

async function editTemplatePreview(tid) {
    $("#abc_edit_form").children().remove();
    $('#preview_popup').children().remove();

    // twoWayDataBinding();

    Promise.all(elArrayFields).then(() => {
        let field_detail = { 'type': 'VARCHAR', 'model': 'user_template_name', 'length': '150' };
        elArrayFields.push(field_detail);

        field_detail = { 'type': 'VARCHAR', 'model': 'template_thumb', 'length': '150' };
        elArrayFields.push(field_detail);
        if (Array.isArray(tid)) {
            $.each(templateDetails, (i, v) => {
                if (v.id === cTid) {
                    currentEditTempThumb = v.screen_thumb;
                }
            });
            sendEditTemplate(elArrayFields, cTid);
        } else {
            $.each(templateDetails, (i, v) => {

                if (v.id === cTid) {
                    currentEditTempThumb = v.screen_thumb;
                }
            });
            sendEditTemplate(elArrayFields, tid);
        }
    });

    $("#page_title").text("Edit Template");

    if (Array.isArray(tid)) {

        formHeader = `<div class="abc-fld-box abc-bg-form">
                                        <div class="abc-fld-lbl">
                                            Template Name
                                        </div>
                                        <div class="abc-fld-inpb">
                                            <input class="abc-ginp" name="user_template_name" value="${tid[2]}" type="text"  placeholder="Display Name" autocomplete='off'/>
                                            <div id="display_temp_err">
                                            </div>
                                        </div>
                                </div>
                              `;
    } else {
        formHeader = `<div class="abc-fld-box abc-bg-form">
                                        <div class="abc-fld-lbl">
                                            Template Name
                                        </div>
                                        <div class="abc-fld-inpb">
                                            <input class="abc-ginp" name="user_template_name" value="" type="text"  placeholder="Display Name" autocomplete='off'/>
                                            <div id="display_temp_err">
                                            </div>
                                        </div>
                                </div>
                              `;
    }

    let edit_template = ` <div class="abc-edit-flex">
                                    <div class="abc-edit-lft">
                                        <div class="abc-edit-head">
                                            <div class="abc-head-sec">
                                                <div class="abc-gback" onclick="goBack();">
                                                    <div class="darr larr">
                                                    </div>
                                                </div>
                                                <div class="abc-hbtxt">
                                                    Fill Your Details
                                                </div>
                                            </div>
                                            <div class="abc-gbtn abc-abs-btn abc-prim-btn dn" onclick="previewTempPop(this);">
                                                Preview
                                            </div>
                                        </div>
                                        <div class="abc-edit-body" id="abc_edit_form">


                                        </div>
                                       
                                    </div>
                                        <div class="abc-edit-rgt">
                                            <div class="abc-edit-tempbox" >
                                                <div class="abc-gpop-head dn">
                                                    <div class="abc-gpop-htxt">
                                                        Preview
                                                    </div>
                                                    <div class='abc-hrgt'>
                                                        
                                                        <div class="abc-gclose" onclick="closeTemplatePrevPop(this);">
                                                        </div>
                                                    </div>

                                                </div>

                                                    <div class='abc-prev-body abc-hexa-bg' id="edit_template_box">
                                                    </div>

                                                 </div>
                                             <div id="domain_create_popup">
                                            </div>
                                        </div>
                                        
                                    </div>`;
    $("#edit_template").append(edit_template);

    $("#template_listing").addClass("dn");
    $("#abc_general_body").addClass("abc-edit-gbody");
    $("#edit_template").removeClass("dn");



    // console.log(currentTemplateId);
    // window.history.pushState("Edit Template", "card-edit-template" + currentTemplateId);

    $("#edit_template_box").append(tempCopy);
    $("#abc_edit_form").append(formHeader);
    await $(tempCopy).find("*").each((i, v) => {
        elArray.push(v);


        elTagName = elArray[i].nodeName;
        if (elTagName === 'SPAN') {

            generateFields($(v).text().trim(), $(elArray)[i].nodeName, $(elArray)[i]);
        } else if (elTagName === 'IMG') {

            generateFields($(v).attr("src"), $(elArray)[i].nodeName, $(elArray)[i]);

        } else if (elTagName === 'A') {

            generateFields($(v).attr("href"), $(elArray)[i].nodeName, $(elArray)[i]);
        }

    });

    // $(tempCopy).find("*").each((i, v) => {
    //     elArray.push(v);


    //     elTagName = elArray[i].nodeName;
    //     if(elTagName === 'SPAN') {

    //         generateFields($(v).text().trim(), $(elArray)[i].nodeName, $(elArray)[i]);          
    //     }
    //     else if(elTagName === 'IMG') {

    //         generateFields($(v).attr("src"), $(elArray)[i].nodeName, $(elArray)[i]);            

    //     }
    //     else if(elTagName === 'A') {

    //         generateFields($(v).attr("href"), $(elArray)[i].nodeName, $(elArray)[i]);
    //     }

    // });

    // localStorage.setItem("template_id", currentTemplateId.substring(1));
    // console.log(localStorage.getItem(event.currentTarget));
    $(".abc-edit-lft").append(formFoot);
}

// DOMSubtreeModified
// console.log($("#edit_template").children('input'));

// $("#edit_template").on('DOMSubtreeModified', function() {

function twoWayDataBinding() {


    for (let els = 0; els < elArray.length; els++) {
        // targetId = event.target.attributes.id.value;
        // targetEl = event.target.nodeName;
        // console.log('elArray');

        if (elArray[els].tagName == 'SPAN') {
            targetId = event.target.attributes.name.value;
            for (let s_els = 0; s_els < $("#edit_template_box").find("span").length; s_els++) {
                elTargetElement = $("#edit_template_box").find("span")[s_els];
                elTargetId = $("#edit_template_box").find("span")[s_els].attributes[1].value;
                // console.log(elTargetId);
                // console.log(elTargetElement);

                if (targetId == elTargetId) {
                    $(elTargetElement).text(event.target.value);
                }
            }

        } else if (elArray[els].tagName === 'A') {
            targetId = event.target.attributes.name.value;

            for (let a_els = 0; a_els < $("#edit_template_box").find("a").length; a_els++) {
                elTargetElement = $("#edit_template_box").find("a")[a_els];
                if ($("#edit_template_box").find("a")[a_els].hasAttribute('name')) {
                    elTargetId = $("#edit_template_box").find("a")[a_els].attributes[1].value;
                    // console.log(elTargetId);
                    // console.log(elTargetElement);

                    if (targetId == elTargetId) {
                        if (elTargetId === 'f-phone') {
                            $(elTargetElement).attr('href', 'tel:' + event.target.value);
                        } else if (elTargetId === 'f-whatsapp') {
                            $(elTargetElement).attr('href', 'https://wa.me/' + event.target.value);
                        } else if (elTargetId === 'f-email') {
                            $(elTargetElement).attr('href', 'mailto:' + event.target.value);
                        } else {
                            $(elTargetElement).attr('href', event.target.value);
                        }

                        if ($(elTargetElement).attr('data-sm') === 'false') {
                            $(elTargetElement).children('.bcard-sub-txt').text(event.target.value);
                        } else {
                            $(elTargetElement).children('.bcard-sub-txt').text(event.target.value);
                        }
                    }
                }

            }
        }

        // console.log($("#edit_template_box").find("a")[els].attributes.value)

        // if($("#edit_template_box").find("a")[els].attributes[1] == "name") {
        //      elTargetIdA = $("#edit_template_box").find("a")[els].attributes[1].value;
        //     elTargetElementA = $("#edit_template_box").find("a")[els];

        //     if (targetIdA == elTargetIdA) {
        //         $(elTargetElement).attr("href", event.target.value);
        //     }
        // }


        // console.log($("#edit_template_box").find("span")[els].attributes[1].value);

    }

}

document.addEventListener('keyup', function() {
    twoWayDataBinding();
});

$("#abc_edit_form").on("keyup", '.abc-ginp', twoWayDataBinding);
// $(".abc-ginp").on("keyup", twoWayDataBinding); 

$("#abc_edit_form").find("textarea").on("keyup", twoWayDataBinding);

function lnavExpMin(e) {
    $(e).parents('.abc-gabs').toggleClass('abc-expmin');
    $(e).children('.abc-arr').children('.darr').toggleClass('larr');
    $(e).children('.abc-arr').children('.darr').toggleClass('rarr');
}

function previewTempPop(e) {
    $(e).parents('.abc-edit-flex').children('.abc-edit-rgt').addClass('abc-scalein');
}

function closeTemplatePrevPop(e) {
    $(e).parents('.abc-edit-rgt').removeClass('abc-scalein');
}

function openMnav(e) {
    $(e).parents('.abc-gabs').toggleClass('abc-mnav-expmin');
    $(e).parents('.abc-gabs').removeClass('abc-expmin');
    $('.abc-rgt-cont').toggleClass('pn-blur');
    $('.abc-lnav-arr').toggleClass('dn');
    // $(e).toggleClass('abc-gburg-close');
}

$(window).resize(function removeMnav(e) {
    if ($(window).width() >= 670) {
        $('.abc-gabs').removeClass('abc-mnav-expmin');
        $('.abc-gburg').removeClass('abc-gburg-close');
        $('.abc-rgt-cont').removeClass('pn-blur');
        $('.abc-lnav-arr').addClass('dn');
    }
});

$(window).resize(function removePrevPop(e) {
    if ($(window).width() >= 1130) {
        $('.abc-edit-rgt').removeClass('abc-scalein');
    }
});

function domainCreate() {
    domainEl = `<div class='abc-gpop-cont abc-scaleout'>
                    <div class='abc-gpop-box abc-gsm-pop'>
                        <div class="abc-gpop-head">
                            <div class="abc-gpop-htxt">
                                Create Domain
                            </div>
                            <div class="abc-hrgt">
                                <div class="abc-gclose" onclick="closePopup(this);">
                                </div>
                            </div>

                        </div>
                        <div class='abc-gpop-body'>
                            <div class="abc-fld-box">
                                <div class="abc-fld-lbl">
                                    Domain Name
                                    <span class='abc-iblue'>
                                        ( Please Enter only Aphabets, Numbers with Hyphens )
                                    <span>
                                </div>
                                <div class="abc-fld-inpb">
                                    <input class="abc-ginp" id="domain_name" name="domain-name" type="text" placeholder="Domain Name" autocomplete="off">
                                    <div id="domain_err">
                                    </div>
                                </div>
                                <div class="abc-lbl-box" id="domain_suggestions">
                                </div>
                            </div>
                        </div>
                        <div class='abc-gpop-ft'>
                            <div class="abc-gbtn abc-red-btn " onclick="closePopup(this);">
                                Cancel
                            </div>
                            <div class="abc-gbtn abc-sec-btn pn" id="dsubmit_btn" onclick="submitDomain(this);">
                                Submit
                            </div>
                        </div>
                    </div>
                </div>`;
    $("#domain_create_popup").append(domainEl);
    setTimeout(() => {
        $(".abc-gpop-cont").addClass("abc-scalein");
    }, 50);
}

function submitDomain(e) {
    let domainObj = {
        template_name: cTid,
        uid: cUid,
        domain_name: domainName
    }

    let domainOpt = {
        method: 'POST',
        body: JSON.stringify(domainObj),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    fetch(backend_url + 'domain', domainOpt)
        .then((res) => {
            res.json()
                .then((res) => {
                    fetch(backend_url + 'user?uid=' + cUid, { method: 'GET' })
                        .then((res) => {
                            res.json()
                                .then((res) => {
                                    console.log(res);
                                    if(res.statuscode === 200 && res.message === 'success') {
                                        localStorage.setItem('udata', JSON.stringify(res));

                                        $('#domain_create_popup').removeClass('abc-scalein');
                                        generateAlert('bg-green', 'Domain Created Successfully', 'Opening Page in New Tab...');
                                        setTimeout(() => {
                                            $('#domain_create_popup').children().remove();
                                            window.open(backend_url + domainName, '_blank');
                                        });
                                    }
                                    else {
                                        generateAlert('bg-green', 'Something Went Wrong !!', 'Please Try Again.');
                                    }
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });

}

function domainCheck() {

    fetch(backend_url + 'fetch/domain', { method: 'GET' })
        .then((res) => {
            res.json()
                .then((res) => {
                    if (res.data.length != 0) {
                        domainName = $('#domain_create_popup').find("input")[0].value;

                        currentDomains = res.data.domain;
                        if ($('#domain_create_popup').children().length > 0) {

                            domainName = $('#domain_create_popup').find("input")[0].value;
                            if (currentDomains.length === 0) {
                                $('#dsubmit_btn').removeClass('pn');
                                $('#domain_suggestions').children().remove();

                                $('#domain_err').children().remove();
                                $('#domain_err').append(`<div class='abc-iblue'>Domain Name is Available</div>`);
                            } else {

                                $.each(currentDomains, (dInd, dVal) => {
                                    if (dVal.domain_name !== domainName) {
                                        $('#dsubmit_btn').removeClass('pn');

                                        domainName = $('#domain_create_popup').find("input")[0].value;
                                        $('#domain_err').children().remove();
                                        $('#domain_suggestions').children().remove();

                                        $('#domain_err').append(`<div class='abc-iblue'>Domain Name is Available</div>`);
                                    } else {
                                        $('#dsubmit_btn').addClass('pn');
                                        domainName = $('#domain_create_popup').find("input")[0].value;
                                        $('#domain_err').children().remove();
                                        $('#domain_suggestions').children().remove();
                                        let suggestionBoxHTMl = `
                                                                <div class='abc-iblue'>Choose from Available Suggestions</div>
                                                                <div class="abc-lbl" onclick='setCurrentSuggestion(this);'>
                                                                    ${domainName + randomSuggestion(1, 10)}
                                                                </div>
                                                                <div class="abc-lbl" onclick='setCurrentSuggestion(this);'>
                                                                    ${domainName + randomSuggestion(10, 100)}
                                                                </div>
                                                                <div class="abc-lbl" onclick='setCurrentSuggestion(this);'>
                                                                    ${domainName + randomSuggestion(100, 1000)}
                                                                </div>
                                                            
                                                            `;
                                        $('#domain_suggestions').append(suggestionBoxHTMl);
                                        $('#domain_err').append(`<div class='abc-ired'>Domain Name is Not Available, 
                                                                    Please Choose Different Name</div>`);

                                    }
                                });
                            }

                        }
                    } else {
                        domainName = $('#domain_create_popup').find("input")[0].value;
                        $('#dsubmit_btn').removeClass('pn');
                        $('#domain_suggestions').children().remove();

                        $('#domain_err').children().remove();
                        $('#domain_err').append(`<div class='abc-iblue'>Domain Name is Available</div>`);
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        })
        .catch((err) => {
            console.log(err);
        })

}

function setCurrentSuggestion(e) {
    $('#domain_create_popup').find("input")[0].value = $(e).text().trim();
    domainCheck();
}

function randomSuggestion(minNo, maxNo) {
    rstr = Math.floor(Math.random() * maxNo) + minNo;
    return rstr;
}

document.addEventListener('keyup', function() {
    domainRegex = /^[a-z0-9]+[a-z0-9-]+[a-z0-9]+$/;
    if (event.target.hasAttribute('id')) {
        if (event.target.value != '') {

            if (domainRegex.test(event.target.value) === false) {

                if (event.target.value < 3) {
                    $('#dsubmit_btn').addClass('pn');
                    $('#domain_suggestions').children().remove();

                    $('#domain_err').children().remove();
                    $('#domain_err').append(`<div class='abc-ired'>Miniumum Three Chracters Required </div>`);
                } else if (event.target.value.includes('-')) {
                    $('#dsubmit_btn').addClass('pn');
                    $('#domain_suggestions').children().remove();

                    $('#domain_err').children().remove();
                    $('#domain_err').append(`<div class='abc-ired'>Hyphens cannot be in the End or Start</div>`);
                } else {
                    $('#dsubmit_btn').addClass('pn');
                    $('#domain_suggestions').children().remove();

                    $('#domain_err').children().remove();
                    $('#domain_err').append(`<div class='abc-ired'>Special Chracters cannot be included</div>`);
                }
            } else if (domainRegex.test(event.target.value) === true) {
                domainCheck();
            }
        } else {
            $('#dsubmit_btn').addClass('pn');
            $('#domain_suggestions').children().remove();

            $('#domain_err').children().remove();
            $('#domain_err').append(`<div class='abc-ired'>Please Enter the Domain Name</div>`);
        }
    }
});

$("#domain_create_popup").on('keyup', '.abc-ginp', domainCheck());


document.addEventListener('change', function() {
    if (event.target.type === 'file') {
        let formData = new FormData();
        cTarget = event.target;

        formData.append('file', event.target.files[0]);

        let uploadObj = {
            method: 'POST',
            body: formData,
        }

        fetch(backend_url + 'upload', uploadObj)
            .then((res) => {
                res.json()
                    .then((res) => {
                        currentImage = res.data.message.tempFilePath;
                        $(cTarget).parents('.abc-fld-subsec').children('.abc-fld-prof').children('.abc-fld-profimg').attr('src', currentImage);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }

});

function uploadImage(e) {
    // console.log($(e).children('input').files[0]);
}

function sendEditTemplate(data, tid) {

    // let field_data_str = JSON.stringify(data);
    // field_data_str = field_data_str.replace(/\//g, '');
    field_data = {
        template_name: tid,
        field: data
    }

    const post_form_data = {
        method: 'POST',
        body: JSON.stringify(field_data),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(backend_url + 'createtable', post_form_data)
        .then((res) => {
            res.json()
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
}

function sendFormData(e) {
    let formSubmitVals = [];
    if ($("input[name='user_template_name']").val() === '' || $("input[name='user_template_name']").val() === undefined) {
        let displayNameErr = `
                              <div class='abc-ired'>
                                Please Enter the Display Name
                              </div>
                             `;
        $('#display_temp_err').children().remove();
        $('#display_temp_err').append(displayNameErr);
    } else {
        $('#display_temp_err').children().remove();
        console.log(currentEditTempThumb);
        let formSubmittedObj = { name: 'template_thumb', value: currentEditTempThumb };
        formSubmitVals.push(formSubmittedObj);
        console.log(formSubmittedObj);

        $('#abc_edit_form').find("input[type='text']").each((e, v) => {
            let formSubmittedObj = { name: v.name, value: v.value };
            formSubmitVals.push(formSubmittedObj);
        });
        $('#abc_edit_form').find("input[type='email']").each((e, v) => {
            let formSubmittedObj = { name: v.name, value: v.value };
            formSubmitVals.push(formSubmittedObj);
        });
        $('#abc_edit_form').find("input[type='number']").each((e, v) => {
            let formSubmittedObj = { name: v.name, value: v.value };
            formSubmitVals.push(formSubmittedObj);
        });
        $('#abc_edit_form').find("textarea").each((e, v) => {
            let formSubmittedObj = { name: v.name, value: v.value };
            formSubmitVals.push(formSubmittedObj);
        });
        $('#abc_edit_form').find("img").each((e, v) => {
            let formSubmittedObj = { name: v.name, value: v.src };
            formSubmitVals.push(formSubmittedObj);
        });

        tempFormData = {
            template_name: cTid,
            uid: cUid,
            values: formSubmitVals
        }
        let tempFormDataOpt = {
            method: 'POST',
            body: JSON.stringify(tempFormData),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch(backend_url + 'fetch/domain', { method: 'GET' })
            .then((res) => {
                res.json()
                    .then((res) => {
                        if (res.data.length != 0) {
                            if (templateUpdateMode === true) {
                                let tempFormDataOpt = {
                                    method: 'PUT',
                                    body: JSON.stringify(tempFormData),
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }

                                fetch(backend_url + 'update/user/template', tempFormDataOpt)
                                    .then((res) => {
                                        res.json()
                                            .then((res) => {
                                                console.log(res);
                                                currentDomains = res.data.domain;
                                                if (res.data.statuscode === 200 && res.data.message === 'success') {
                                                    fetch(backend_url + 'fetch/user/template?uid=' + cUid, { method: 'GET' })
                                                        .then((res) => {
                                                            res.json()
                                                                .then((res) => {
                                                                    myCards = res.data.domain;
                                                                    loadMyCards(myCards, e);
                                                                    generateAlert('bg-green', 'Data Updated Successfully.', '');
                                                                    let currentUidData = localStorage.getItem('udata');
                                                                    let currentUidObj = JSON.parse(currentUidData).data.data[0];

                                                                    if (currentUidObj.template_limit === currentUidObj.template_count) {

                                                                    } else {
                                                                        domainCreate();
                                                                    }
                                                                })
                                                                .catch((err) => {
                                                                    console.log(err);
                                                                });
                                                        })
                                                        .catch((err) => {
                                                            console.log(err);
                                                        });


                                                }
                                            })
                                            .catch((err) => {
                                                console.log(err)
                                            });
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    });
                            } else {

                                fetch(backend_url + 'user?uid=' + cUid, { method: 'GET' })
                                    .then((res) => {
                                        res.json()
                                            .then((res) => {
                                                localStorage.setItem('udata', JSON.stringify(res));
                                                let currentUidData = localStorage.getItem('udata');
                                                let currentUidObj = JSON.parse(currentUidData).data.data[0];

                                                if (currentUidObj.template_limit === currentUidObj.template_count) {
                                                    let templateLimit = `
                                                        <div class='abc-gpop-cont abc-slideout' id='contact_pop'>
                                                            <div class='abc-gpop-box abc-gsm-pop'>
                                                                <div class="abc-gpop-head">
                                                                    <div class="abc-gpop-htxt">
                                                                        Template/ Domain Creation Limit Reached
                                                                    </div>
                                                                    <div class="abc-hrgt">
                                                                        <div class="abc-gclose" onclick="closePopup(this);">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="abc-gpop-body abc-gpop-content">
                                                                    <div class="abc-ginfo-txt">
                                                                        <span class="abc-ired abc-badge">
                                                                            Template/ Domain Creation Limit Reached
                                                                        </span>
                                                                        You Can't Create this Template. Please Contact the Administrator.
                                                                        or Delete the Template in My Cards
                                                                    </div>
                                                                    <div class='abc-ginfo-box'>
                                                                        <div class='abc-ginfo-sec'>
                                                                            <div>
                                                                                <i class="fa-solid fa-phone"></i>
                                                                            </div>
                                                                            <div>
                                                                                <a href='tel:+9193444 82370'>
                                                                                    +9193444 82370
                                                                                </a>
                                                                            </div>
                                                                        </div>
                                                                        <div class='abc-ginfo-sec'>
                                                                            <div>
                                                                               <i class="fa-solid fa-envelope"></i>
                                                                            </div>
                                                                            <div>
                                                                                 <a href="mailto:contact@aristostech.in">
                                                                                    contact@aristostech.in
                                                                                 </a>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>

                                                            </div>
                                                        </div>
                                                        `;
                                                    $('#contact_page').append(templateLimit);
                                                    setTimeout(() => {
                                                        $('#contact_pop').addClass('abc-slidein');
                                                    }, 200);
                                                } else {
                                                    if (templateUpdateMode === true) {
                                                        let tempFormDataOpt = {
                                                            method: 'PUT',
                                                            body: JSON.stringify(tempFormData),
                                                            headers: {
                                                                'Content-Type': 'application/json'
                                                            }
                                                        }

                                                        fetch(backend_url + 'update/user/template', tempFormDataOpt)
                                                            .then((res) => {
                                                                res.json()
                                                                    .then((res) => {
                                                                        currentDomains = res.data.domain;

                                                                        if (res.data.statuscode === 200 && res.data.message === 'success') {
                                                                            generateAlert('bg-green', 'Data Updated Successfully.', '');

                                                                            domainCreate();
                                                                        }
                                                                    })
                                                                    .catch((err) => {
                                                                        console.log(err)
                                                                    });
                                                            })
                                                            .catch((err) => {
                                                                console.log(err)
                                                            });
                                                    } else {

                                                        fetch(backend_url + 'createwebsite', tempFormDataOpt)
                                                            .then((res) => {
                                                                res.json()
                                                                    .then((res) => {
                                                                        console.log(res);
                                                                        currentDomains = res.data.domain;
                                                                        console.log(currentDomains);

                                                                        if (res.data.statuscode === 200 && res.data.message === 'success') {
                                                                            generateAlert('bg-green', 'Template Created Successfully.', 'Please Check My Cards.');
                                                                            domainCreate();
                                                                            fetch(backend_url + 'user?uid=' + cUid, { method: 'GET' })
                                                                                .then((res) => {
                                                                                    res.json()
                                                                                        .then((res) => {
                                                                                            localStorage.setItem('udata', JSON.stringify(res));
                                                                                            console.log(res);
                                                                                        })
                                                                                        .catch((err) => {
                                                                                            console.log(err)
                                                                                        });
                                                                                })
                                                                                .catch((err) => {
                                                                                    console.log(err)
                                                                                });
                                                                        } else if (res.data.statuscode === 200 && res.data.message === 'already_exit') {
                                                                            generateAlert('bg-green', 'Template Already Exists !!!', 'Please Check My Cards.');
                                                                        }

                                                                    })
                                                                    .catch((err) => {
                                                                        console.log(err)
                                                                    });
                                                            })
                                                            .catch((err) => {
                                                                console.log(err)
                                                            });
                                                    }
                                                }
                                                console.log(res);
                                            })
                                            .catch((err) => {
                                                console.log(err)
                                            });
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    });
                            }

                        } else {
                            if (templateUpdateMode === true) {
                                let tempFormDataOpt = {
                                    method: 'PUT',
                                    body: JSON.stringify(tempFormData),
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }

                                fetch(backend_url + 'update/user/template', tempFormDataOpt)
                                    .then((res) => {
                                        res.json()
                                            .then((res) => {
                                                console.log(res);
                                                if (res.data.statuscode === 200 && res.data.message === 'success') {
                                                    currentDomains = res.data.domain;

                                                    generateAlert('bg-green', 'Data Updated Successfully.', '');

                                                    domainCreate();
                                                }
                                            })
                                            .catch((err) => {
                                                console.log(err)
                                            });
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    });
                            } else {

                                fetch(backend_url + 'createwebsite', tempFormDataOpt)
                                    .then((res) => {
                                        res.json()
                                            .then((res) => {
                                                currentDomains = res.data.domain;

                                                if (res.data.statuscode === 200 && res.data.message === 'success') {
                                                    generateAlert('bg-green', 'Template Created Successfully.', 'Please Check My Cards.');
                                                    domainCreate();
                                                    fetch(backend_url + 'user?uid=' + cUid, { method: 'GET' })
                                                        .then((res) => {
                                                            res.json()
                                                                .then((res) => {
                                                                    localStorage.setItem('udata', JSON.stringify(res));
                                                                })
                                                                .catch((err) => {
                                                                    console.log(err)
                                                                });
                                                        })
                                                        .catch((err) => {
                                                            console.log(err)
                                                        });
                                                } else if (res.data.statuscode === 200 && res.data.message === 'already_exit') {
                                                    generateAlert('bg-green', 'Template Already Exists !!!', 'Please Check My Cards.');
                                                }

                                            })
                                            .catch((err) => {
                                                console.log(err)
                                            });
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    });
                            }

                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });



    }

}

// function loadDomain(currentDomain) {
//     let loadDomain = {
//         method: 'POST',
//     }
//     fetch(backend_url + currentDomain, loadDomain)
//         .then((res) => {
//                     res.json()
//                         .then((res) => {
//                             console.log(res);
//                             loadDomainObj = res.data.data;
//                         })
//                         .catch((err) => {
//                             console.log(err)
//                         });
//                 })
//                 .catch((err) => {
//                     console.log(err)
//                 })
// }

// loadDomain(currentDomain);


function UserLoginInit() {
    uData = {};

    uHash = window.location.hash;

    if (uHash.length > 20) {
        localStorage.setItem('cUser', uHash);
    }
    uData = atob(localStorage.getItem('cUser').substring(1));

    localStorage.setItem('udata', uData);
    uData = localStorage.getItem('udata');
    pUdata = JSON.parse(uData);
    cUid = pUdata.data.data[0].uid;

    uDetails = `<div class="abc-ghprof-txt">
                   ${pUdata.data.data[0].username}
                </div>
                 <div class="abc-ghprof-subtxt">
                    ${pUdata.data.data[0].email}
                </div>`;
    $('.user-details').html(uDetails);
    loadLeftNavMenu();

    // setTimeout(() => {
    //     // console.log()
    //     // window.location.href = 'http://localhost:7070/aristos-business-card/card/product-html/card-templates.html';
    // }, '100'0);
}

UserLoginInit();


function generateAlert(status, message, sub_message) {
    $('#alerts').children().remove();

    if (status == 'bg-red') {
        $("#alerts").removeClass("abc-alert-green");
        $("#alerts").removeClass("abc-alert-blue");
        $("#alerts").addClass("abc-alert-red");
        $("#alerts").append("<div class='auth-close'></div>");
    } else if (status == 'bg-green') {
        $("#alerts").removeClass("abc-alert-red");
        $("#alerts").removeClass("abc-alert-blue");
        $("#alerts").addClass("abc-alert-green");
        $("#alerts").append("<div class='auth-tick'></div>");
    }
    else if (status == 'bg-blue') {
        $("#alerts").removeClass("abc-alert-green");
        $("#alerts").removeClass("abc-alert-red");
        $("#alerts").addClass("abc-alert-blue");
        $("#alerts").append("<div class='auth-tick'></div>");
    }

    $("#alerts").append("<div class='auth-notify-lbl'></div>");
    $("#alerts").children(".auth-notify-lbl").text(message);

    $("#alerts").append("<div class='auth-notify-sublbl'></div>");
    $("#alerts").children(".auth-notify-sublbl").text(sub_message);

    $("#alerts").addClass("auth-notify-show");
    setTimeout(() => {
        $("#alerts").removeClass("auth-notify-show");
        $("#alerts").removeClass("abc-alert-green");
        $("#alerts").removeClass("abc-alert-red");
        $("#alerts").removeClass("abc-alert-blue");

    }, 6000);
}

function generateInfoPage(mainText, subText) {
    let infoPage = `
                    <div class='abc-abs-page'>
                        <div class='abc-info-box'>
                            <div class='abc-info-ico'>
                                <i class="fa-solid fa-circle-info"></i>
                            </div>

                            <div class='abc-info-lgtxt'>
                                ${mainText}
                            </div>
                            <div class='abc-info-smtxt'>
                                ${subText}
                            </div>
                        </div>
                    </div>
                   `;

    $("#template_listing").children().remove();
    $("#template_listing").append(infoPage);
    $("#template_listing").removeClass("abc-trans-lft0");

    setTimeout(() => {
        $("#template_listing").addClass("abc-trans-lft0");
    }, 200);
}

// });

// function twdb() {
//     console.log("twdb called");
//     $("#abc_edit_form").find("input").on("keyup", twoWayDataBinding); 
// }

// });

//  $("#abc_edit_form").find("textarea").keyup(function twoWayDataBinding() {
//     console.log('two twoWayDataBinding');
//     console.log(event.target.attributes.id.value);

//     // $("").text($(event.target.text));
//     console.log(elArray);
//     for (let els = 0; els < elArray.length; els++) {
//         // targetId = event.target.attributes.id.value;
//         // elTargetId = $("#edit_template_box").find("span")[els].attributes[1].value;
//         console.log($("#edit_template_box").find("span")[els].attributes);
//         // elTargetElement = $("#edit_template_box").find("span")[els];

//         // console.log($("#edit_template_box").find("span")[els].attributes[1].value);
//         // if (targetId == elTargetId) {
//         //     $(elTargetElement).text(event.target.value);
//         //     console.log(elTargetId, event.target.value);
//         // }
//     }


// });

// console.log(currentInput);
// currentInput.'keyup', twoWayDataBinding();
// });


// window.onload = () => {
//     console.log(localStorage.getItem("template_id"));
//     if(localStorage.getItem("template_id") != null) {
//         console.log("edot te[;");
//         let currentTemplateEvent = localStorage.getItem("template_id");
//         console.log(currentTemplateEvent);
//         // if() {

//         // }
//         loadEditTemplate(currentTemplateEvent);
//     }
//     else {
//         loadTemplates(localStorage.getItem("temp_name"));
//         console.log("back");
//     }
// }