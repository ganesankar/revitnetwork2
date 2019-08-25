export const renderSocial = (param) => {
    return "fab fa-" + param;
};
export const renderHttp = (param) => {
    return "https://" + param;
};
export const socialNetList = () => {
    const social = [
        { name: "facebook", reactCom: "faFacebook", title: "Facebook", id: 0, value: "" },
        { name: "instagram",reactCom: "faInstagram", title: "Instagram", id: 1, value: "" },
        { name: "twitter", reactCom: "faTwitter",title: "Twitter", id: 2, value: "" },
        { name: "blogger", reactCom: "faBlogger",title: "Blog/Website", id: 3, value: "" },
        { name: "skype", reactCom: "faSkype",title: "Skype", id: 4, value: "" },
        { name: "whatsapp", reactCom: "faWhatsapp",title: "Whatsapp", id: 5, value: "" },
        { name: "github", reactCom: "faGithub", title: "Github", id: 6, value: "" },
        { name: "google",reactCom: "faGoogle", title: "Google", id: 7, value: "" },
        { name: "linkedin-in",reactCom: "faLinkedinIn", title: "Linked In", id: 8, value: "" },
        { name: "medium-m", reactCom: "faMmediumM",title: "Medium", id: 9, value: "" },
        { name: "microsoft", reactCom: "faMicrosoft",title: "Microsoft", id: 10, value: "" },
        { name: "pinterest",reactCom: "faPinterest", title: "Pintrest", id: 11, value: "" },
        { name: "quora",reactCom: "faQuora", title: "Quora", id: 12, value: "" },
        { name: "youtube", reactCom: "faYoutube",title: "Youtube", id: 13, value: "" }
      ]
    return social;
};
export const semesterList = () => {
    const social = [
        { name: "s1",  id: 1, value: "" },
        { name: "s2",  id: 2, value: "" },
        { name: "s3",  id: 3, value: "" },
        { name: "s4",  id: 4, value: "" },
        { name: "s5",  id: 5, value: "" },
        { name: "s6",  id: 6, value: "" },
        { name: "s7",  id: 7, value: "" },
        { name: "s8",  id: 8, value: "" },
      ]
    return social;
};

