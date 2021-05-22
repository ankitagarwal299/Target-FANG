var validIPAddress = function (IP) {
    if (!IP?.length || IP.includes('::') || (IP.includes(':') && IP.includes('.'))) return "Neither";

    if (IP.includes('.')) {
        let groups = IP.split('.');
        if (groups.length != 4) return "Neither";//"172.16.254.1."

        for (let group of groups) {
            if (group.length == 0 || group.length > 3) return "Neither";//"172..1234.1"

            if (group.charAt(0) == 0 && group.length != 1) return "Neither";//"172.06.254.1"

            if (group < 0 || group > 255) return "Neither";//"172.-6.999.1"

            for (let char of group) {
                if (isNaN(char)) return "Neither";//"172.a.254.1"
            }
        }

        return "IPv4";
    }
    else if (IP.includes(':')) {
        let hexDecimal = '0123456789abcdefABCDEF';
        let groups = IP.split(':');
        if (groups.length != 8) return "Neither";

        for (let group of groups) {
            if (group.length == 0 || group.length > 4) return "Neither";

            //if(group.charAt(0)==0 && group.length!=1) return "Neither"; //allowed leading zeros

            for (let char of group) {
                if (!hexDecimal.includes(char)) return "Neither";
            }
        }
        return "IPv6"
    }
};


//Regex:
//https://www.youtube.com/watch?v=EB5FAwHqpm4

var validIPAddress = function (IP) {
    if (!IP?.length) return "Neither";


    var vaildateIpv4 = function (str) {
        let pattern = "(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])";
        let regex = new RegExp(pattern);
        return regex.test(str);
    }

    if (vaildateIpv4(IP)) return "IPv4";

    var vaildateIpv6 = function (str) {
        let pattern = "((([0-9a-fA-F]){1,4})\\:){7}([0-9a-fA-F]){1,4}";
        let regex = new RegExp(pattern);
        return regex.test(str);
    }

    if (vaildateIpv6(IP)) return "IPv6";

    return "Neither";
};

console.log(validIPAddress("172.16.254.1"));
console.log(validIPAddress("2001:0db8:85a3:0:0:8A2E:0370:7334"));
console.log(validIPAddress("256.256.256.256"));
console.log(validIPAddress("2001:0db8:85a3:0:0:8A2E:0370:7334:"));
console.log(validIPAddress("1e1.4.5.6"));

