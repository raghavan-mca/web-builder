let backend_url = 'http://localhost:2022/';

let pageTitle = "Templates";
$("#page_title").text(pageTitle);

let elArrayFields = [];

let linksGroupName = [];
let linksGroupElements = [];
let socialPlatformField = '';

let socialPlatformGroupFields = '';

let tempMenu = {
        templates : {

                menus: [
                    {
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
                            "template_general"
                        ]
                    },
            ],
            title: "Templates",
            name: "popular",
            on_click: "loadTemplates(this);",
            templates_list : [
            ]

        },
        my_cards : {
            menus: 
                [
                    {
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
                        templates_list: [
                        ]
                    },
                ]
            ,
            title: "Profile",
            name: "my_cards",
            on_click: "loadTemplates(this);",
            templates_list : [
            ]
        }
};

let templateDetails = [
    {
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
];

let elArray = [];

function closePopup(e) {
    $(e).parents(".abc-gpop-cont").removeClass("abc-scalein");
}

function loadTemplatePreview(e) {   

    event.stopPropagation();
    $(e).parents('.abc-gabs').removeClass('abc-mnav-expmin');
    $('.abc-gburg').removeClass('abc-gburg-close');

    $("#preview_popup").children().remove();
 
    $.each(templateDetails, (tempDetailKey, tempDetailVal) => {
            // console.log(tempDetailVal);

        if($(e).parents(".abc-temp").attr("name") == tempDetailVal.id) {
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

function loadMessages(e) {
    $("#page_title").text("Messages");
    if($(e).hasClass("abc-lnav-smenu")) {
        $(e).parents("#abc_left_nav").children(".abc-lnav-li").children("ul").children(".abc-lnav-subli").children(".abc-lnav-smenu").removeClass("abc-smenu-on");
    }
    else {
        $("#abc_left_nav").children(".abc-lnav-li").children(".abc-lnav-menu").removeClass("abc-smenu-on");        
    }

    if($(e).hasClass('abc-smenu-on')) {
        $(e).removeClass("abc-smenu-on");
    }
    else {
        $(e).addClass("abc-smenu-on");
    }

    $("#template_listing").removeClass("dn");
    $("#edit_template").children().remove();
    $("#edit_template").addClass("dn");
    $("#abc_general_body").removeClass("abc-edit-gbody");


    messageRow = `
                 <tr>
                        <td class="abc-td">
                            <span class="abc-td-lbl">
                                1
                            </span>
                        </td>
                        <td class="abc-td">
                            <span class="abc-td-lbl">
                                Johndoe
                            </span>
                        </td>
                        <td class="abc-td">
                            <span class="abc-td-lbl">
                                9123234234
                            </span>
                        </td>
                        <td class="abc-td">
                            <span class="abc-td-lbl">
                                johndoe123@gmail.com
                            </span>
                        </td>
                        <td class="abc-td">
                            <span class="abc-td-lbl">
                                Lorem Ipsum Lorem IpsumLorem IpsumvLorem IpsumLorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum vLorem Ipsum 
                                Lorem IpsumLorem IpsumLorem Ipsum  vv vLorem IpsumLorem IpsumLorem IpsumLorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum vvLorem IpsumLorem IpsumLorem IpsumLorem Ipsum Lorem Ipsum v
                            </span>
                        </td>
                    </tr>
    `;
        messageTable = ` <div class="abc-table-box">
                        <table class="abc-table">
                            <thead>
                                <th class="abc-th abc-sm">
                                    <span class="abc-th-lbl">
                                        Sl.No
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
                               ${messageRow}
                            </tbody>
                        </table>
                    </div>
`;

    $("#template_listing").children().remove();
    $("#template_listing").append(messageTable);
    $("#template_listing").removeClass("abc-trans-lft0");

    setTimeout(() => {
        $("#template_listing").addClass("abc-trans-lft0");
    }, 200);

}

function loadTemplates(e) {
    // event.stopPropagation();
    elArray = [];

    socialPlatformGroupFields = [];
    $("#abc_edit_form").children().remove();

    $("#page_title").text("Templates");
    
    localStorage.removeItem("template_id");
    // console.log($(e).hasClass("abc-lnav-smenu"));

    // $(e).children(".abc-lnav-li").children(".abc-lnav-menu").removeClass("abc-smenu-on");

    if($(e).hasClass("abc-lnav-smenu")) {
        $(e).parents("#abc_left_nav").children(".abc-lnav-li").children("ul").children(".abc-lnav-subli").children(".abc-lnav-smenu").removeClass("abc-smenu-on");
    }
    else {
        $("#abc_left_nav").children(".abc-lnav-li").children(".abc-lnav-menu").removeClass("abc-smenu-on");        
    }

    if($(e).hasClass('abc-smenu-on')) {
        $(e).removeClass("abc-smenu-on");
    }
    else {
        $(e).addClass("abc-smenu-on");
    }
    // console.log($(".abc-lnav-menu"));

    $("#template_listing").removeClass("dn");
    $("#edit_template").children().remove();
    $("#edit_template").addClass("dn");
    $("#abc_general_body").removeClass("abc-edit-gbody");

    let currentMenuName = event.currentTarget.attributes.name.value;
    findTemplate(currentMenuName);
}  

function findTemplate(currentMenuName) {
      localStorage.setItem("temp_name", currentMenuName);

    // let currentMenuName = tempNameValue;
    let activeMenuListingConcat = '';

    // console.log(event.currentTarget);
    $.each(tempMenu, (menuKeys, templateValues) => {
        // console.log(templateValues.menus);
        for(let i=0; i<templateValues.menus.length; i++) {
            let tempMenu = templateValues.menus;
           

            if(tempMenu[i].name == currentMenuName) {

                // console.log(tempMenu[i].templates_list); 
                $.each(tempMenu[i].templates_list, (templateListInd, templateListVal) => {
                    $.each(templateDetails, (templateDetailIndex, templateDetailValues) => {
                    if(templateDetailValues.id === templateListVal) {
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
                                                        <div class="abc-gbtn abc-sec-btn" onclick="loadTemplatePreview(this);">
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
                }, 200)
            }
        }
    });
}

function loadLeftNavMenu() {
    
    $.each( tempMenu, (key, mainMenu) => {
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

        if( Object.keys(mainMenu.menus).length !== 0) {

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
        }
        else if( Object.keys(mainMenu.menus).length == 0) {

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


loadLeftNavMenu();


function generateFields(textContent, tagName, currentElement) {
    fldName = $(currentElement).attr("data-field-name");
    // tid = $(currentElement).attr("data-tid");
    // fid = $(currentElement).attr("data-fid");
    mlId = $(currentElement).attr("data-multiline");
    nameId = $(currentElement).attr("name");

  

    formFoot = `
                <div class="abc-edit-foot">
                    <div class="abc-gbtn abc-red-btn ">
                        Cancel
                    </div>
                    <div class="abc-gbtn abc-sec-btn" onclick=sendFormData(this);>
                        Submit
                    </div>
                </div>
                `;

    // console.log(tagName);
    if (tagName == 'SPAN') {
    	if(mlId === 'false') {

        let field_detail = {'type':'varchar','model':nameId};
        
        console.log(field_detail);

        elArrayFields.push(field_detail);
        console.log(elArrayFields);

        formField = `  <div class="abc-fld-box">
                                <div class="abc-fld-lbl">
                                    ${fldName}
                                </div>
                                <div class="abc-fld-inpb">
                                    <input class="abc-ginp" name="${nameId}" value="${textContent}" type="text"  placeholder="${fldName}" autocomplete='off'/>
                                </div>
                            </div>`;
    	}
    	else if(mlId === 'true') {
        let field_detail = {'type':'varchar','model':nameId};
        elArrayFields.push(field_detail);

    		formField =     `  <div class="abc-fld-box">
                                <div class="abc-fld-lbl">
                                     ${fldName}
                                </div>
                                <div class="abc-fld-inpb">
	                                <textarea class="abc-gml" name="${nameId}" value="${textContent}" placeholder="${fldName}" autocomplete='off'>${textContent.trim()}</textarea>
                                </div>
                            </div>`;
        }              

        $("#abc_edit_form").append(formField);

    } else if (tagName == 'IMG') {
        // imgSrc = $(currentElement).attr("src");
        let field_detail = {
            'type': 'varchar',
            'model': nameId,
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
                                            <input type="file" accept="image/jpeg, image/jpg" style="opacity: 0;"/>
                                            Change
                                        </div>
                                    </div>
                                </div>
                            </div>`;
        $("#abc_edit_form").append(imgField);

    }
    else if(tagName == 'A' && $(currentElement).attr("name") !== true && typeof($(currentElement).attr("name")) !== 'undefined') {
        // console.log($(currentElement).attr('data-sm'));
        if($(currentElement).attr('data-sm') === 'true') {

            // console.log($(currentElement).children('.bcard-smico-sec').html());
            // console.log($(currentElement).find('i')[0].outerHTML);


            if($(currentElement).attr('href').substring(0, 4) === 'tel:') {
                let field_detail = {
                    'type': 'varchar',
                    'model': $(currentElement).attr('name'),
                }
                elArrayFields.push(field_detail);

                socialPlatformField = `<div class="abc-fld-subsec">
                        <div class="abc-fld-icob">
                            ${$(currentElement).find('i')[0].outerHTML}
                        </div>
                        <input type="number" name="${$(currentElement).attr('name')}" value="${$(currentElement).attr('href').substring(5)}" class="abc-ginp" autocomplete='off'/>
                    </div>`;
            }
            
            else if($(currentElement).attr('href').substring(0, 7) === 'mailto:') {
                let field_detail = {
                    'type': 'varchar',
                    'model': $(currentElement).attr('name'),
                }
                elArrayFields.push(field_detail);

                socialPlatformField = `<div class="abc-fld-subsec">
                        <div class="abc-fld-icob">
                            ${$(currentElement).find('i')[0].outerHTML}
                        </div>
                        <input type="email" name="${$(currentElement).attr('name')}" value="${$(currentElement).attr('href').substring(7)}" class="abc-ginp" autocomplete='off'/>
                    </div>`;
            }
            else if($(currentElement).attr('href').substring(0, 14) === 'https://wa.me/') {
                let field_detail = {
                    'type': 'varchar',
                    'model': $(currentElement).attr('name'),
                }
                elArrayFields.push(field_detail);

                socialPlatformField = `<div class="abc-fld-subsec">
                        <div class="abc-fld-icob">
                            ${$(currentElement).find('i')[0].outerHTML}
                        </div>
                        <input type="number" name="${$(currentElement).attr('name')}" value="${$(currentElement).attr('href').substring(15)}" class="abc-ginp" autocomplete='off'/>
                    </div>`;
            }
            
            else {
                let field_detail = {
                    'type': 'varchar',
                    'model': $(currentElement).attr('name'),
                }
                elArrayFields.push(field_detail);

                socialPlatformField = `<div class="abc-fld-subsec">
                        <div class="abc-fld-icob">
                            ${$(currentElement).find('i')[0].outerHTML}
                        </div>
                        <input type="text" name="${$(currentElement).attr('name')}" value="${$(currentElement).attr('href')}" class="abc-ginp" autocomplete='off'/>
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
    localStorage.removeItem("template_id");

    elArray = [];

    $("#template_listing").removeClass("dn");
    $("#abc_general_body").removeClass("abc-edit-gbody");
    $("#edit_template").children().remove();
    $("#edit_template").addClass("dn");
    $("#abc_edit_form").children().remove();
    $("#page_title").text("Templates");
    socialPlatformGroupFields = [];
}

async function loadEditTemplate(tid) {
    event.stopPropagation();
    $("#abc_edit_form").children().remove();
    $('#preview_popup').children().remove();
    // twoWayDataBinding();
    Promise.all(elArrayFields).then(() => {
        console.log(elArrayFields);
        sendEditTemplate(elArrayFields, tid);
    });


    $("#page_title").text("Edit Template");
  formHeader = `<div class="abc-fld-box abc-bg-form">
                        <div class="abc-fld-lbl">
                            Template Name
                        </div>
                        <div class="abc-fld-inpb">
                            <input class="abc-ginp" name="display-name" value="" type="text"  placeholder="Display Name" autocomplete='off'/>
                        </div>
                </div>
              `;

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

                                <div class='abc-prev-body' id="edit_template_box">
                                </div>

                            </div>
                        </div>
                        <div id="domain_create_popup">
                        </div>
                    </div>`;
    $("#edit_template").append(edit_template);

    $("#template_listing").addClass("dn");
    $("#abc_general_body").addClass("abc-edit-gbody");
    $("#edit_template").removeClass("dn");

    let currentTemplateId = "#" + tid;
    // console.log(tid);
    tempCopy = $(currentTemplateId).html();

    // console.log(currentTemplateId);
    window.location.replace(currentTemplateId);
    // window.history.pushState("Edit Template", "card-edit-template" + currentTemplateId);

    $("#edit_template_box").append(tempCopy);
    $("#abc_edit_form").append(formHeader);

    await $(tempCopy).find("*").each((i, v) => {
        elArray.push(v);


        elTagName = elArray[i].nodeName;
        if(elTagName === 'SPAN') {

            generateFields($(v).text().trim(), $(elArray)[i].nodeName, $(elArray)[i]);          
        }
        else if(elTagName === 'IMG') {
           
            generateFields($(v).attr("src"), $(elArray)[i].nodeName, $(elArray)[i]);            

        }
        else if(elTagName === 'A') {
           
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

    localStorage.setItem("template_id", currentTemplateId.substring(1));
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

            if(elArray[els].tagName == 'SPAN') {
                targetId = event.target.attributes.name.value;
                for(let s_els=0; s_els<$("#edit_template_box").find("span").length; s_els++) {
                    elTargetElement = $("#edit_template_box").find("span")[s_els];
                    elTargetId = $("#edit_template_box").find("span")[s_els].attributes[1].value;
                    // console.log(elTargetId);
                    // console.log(elTargetElement);

                    if (targetId == elTargetId) {
                        $(elTargetElement).text(event.target.value);
                    }
                }
                
            }
            else if(elArray[els].tagName === 'A') {
                targetId = event.target.attributes.name.value;

                for(let a_els=0; a_els<$("#edit_template_box").find("a").length; a_els++) {
                    elTargetElement = $("#edit_template_box").find("a")[a_els];
                    if($("#edit_template_box").find("a")[a_els].hasAttribute('name')) {
                        elTargetId = $("#edit_template_box").find("a")[a_els].attributes[1].value;
                        // console.log(elTargetId);
                        // console.log(elTargetElement);

                        if (targetId == elTargetId) {
                            if(elTargetId === 'f-phone') {
                                $(elTargetElement).attr('href', 'tel:' + event.target.value);                               
                            }

                            else if(elTargetId === 'f-whatsapp') {
                                $(elTargetElement).attr('href', 'https://wa.me/' + event.target.value);                               
                            }
                            else if(elTargetId === 'f-email') {
                                $(elTargetElement).attr('href', 'mailto:' + event.target.value);                               
                            }
                            else {
                                $(elTargetElement).attr('href', event.target.value);                               
                            }
                            
                            if($(elTargetElement).attr('data-sm') === 'false') {
                                $(elTargetElement).children('.bcard-sub-txt').text(event.target.value);
                            }
                            else {
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
    if($(window).width() >= 670) {
        $('.abc-gabs').removeClass('abc-mnav-expmin');
        $('.abc-gburg').removeClass('abc-gburg-close');
        $('.abc-rgt-cont').removeClass('pn-blur');
        $('.abc-lnav-arr').addClass('dn');
    }
});

$(window).resize(function removePrevPop(e) {
    if($(window).width() >= 1130) {
        $('.abc-edit-rgt').removeClass('abc-scalein');
    }
});

function domainCreate(e) {
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
                                </div>
                                <div class="abc-fld-inpb">
                                    <input class="abc-ginp" name="domain-name" type="text" placeholder="Domain Name" autocomplete="off">
                                </div>

                                <div class='abc-lbl-box' id="domain_suggestions">
                                    <div class='abc-lbl'>
                                        johndoe123
                                    </div>
                                    <div class='abc-lbl'>
                                        johndoe034
                                    </div>
                                    <div class='abc-lbl'>
                                        johndoe12034
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class='abc-gpop-ft'>
                            <div class="abc-gbtn abc-red-btn " onclick="closePopup(this);">
                                Cancel
                            </div>
                            <div class="abc-gbtn abc-sec-btn" onclick="submitDomain(this);">
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

}

function uploadImage(e) {

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