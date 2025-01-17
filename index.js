module.exports = async(e = "", t = "") => {
    if (!(e = (e + "").trim()).length || e.match(/\D/)) throw Error("INVAILD_PHONE");
    let r = (t += "").split("v=");
    if (18 != (t = (r[1] || r[0]).match(/[0-9A-Za-z]+/)[0]).length) throw Error("INVAILD_VOUCHER");
    let o = await require("petitio")(`https://voucher.meowcdn.xyz/api`, "POST").body({
        mobile: e,
        voucher: t
    }).json();
    if ("SUCCESS" == o.status.code) return {
        amount: Number(o.data.my_ticket.amount_baht.replace(/,/g, '')),
        owner_full_name: o.data.owner_profile.full_name,
        code: t,
        status: o.status.code
    };
    return {
        amount: 0,
        owner_full_name: o.data.owner_profile.full_name,
        code: t,
        status: o.status.code
    };
};
