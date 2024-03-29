﻿//====================================================================================================
// Description：Cryptos.js
//====================================================================================================

var Unicode = (function () {
    function Unicode() {
    }

    /**
     * Unicode Encode
     * @param {string} text
     * @returns {string} 
     */
    Unicode.prototype.encode = function (text) {
        var unicodeString = '';
        for (var i = 0; i < text.length; i++) {
            var theUnicode = text.charCodeAt(i).toString(16).toUpperCase();
            while (theUnicode.length < 4) {
                theUnicode = '0' + theUnicode;
            }
            theUnicode = '\\u' + theUnicode;
            unicodeString += theUnicode;
        }
        return unicodeString;
    };

    /**
     * Unicode Decode
     * @param {string} text
     * @returns {string} 
     */
    Unicode.prototype.decode = function (text) {
        return text.replace(/\\u[\dA-F]{4}/gi, function (match) {
            return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
        });
    };

    return Unicode;
})();

var Base64 = (function () {
    function Base64() {
    }

    /**
     * Base64 Encode
     * @param {string} text
     * @returns {string} 
     */
    Base64.prototype.encode = function (text) {
        return window.btoa(text);
    };

    /**
     * Base64 Decode
     * @param {string} text
     * @returns {string} 
     */
    Base64.prototype.decode = function (text) {
        return window.atob(text)
    };

    return Base64;
})();

var XOREncrypt = (function () {
    function XOREncrypt() {
    }

    /**
     * XOR Encrypt
     * @param {string} text
     * @param {string} key
     * @returns {string} 
     */
    XOREncrypt.prototype.encrypt = function (text, key) {
        var result = this._xor(text, key);
        return window.btoa(result);
    };

    /**
     * XOR Decrypt
     * @param {string} text
     * @param {string} key
     * @returns {string} 
     */
    XOREncrypt.prototype.decrypt = function (text, key) {
        var result = this._xor(window.atob(text), key);
        return result;
    };

    XOREncrypt.prototype._xor = function (text, key) {
        var ord = []
        var buf = ""

        for (z = 1; z <= 255; z++) { ord[String.fromCharCode(z)] = z }

        for (j = z = 0; z < text.length; z++) {
            buf += String.fromCharCode(ord[text.substr(z, 1)] ^ ord[key.substr(j, 1)])
            j = (j < key.length) ? j + 1 : 0
        }

        return buf
    };

    return XOREncrypt;
})();

var MD5 = (function () {
    function MD5() {
    }

    /**
     * MD5 Encrypt
     * @param {string} text
     * @returns {string} 
     */
    MD5.prototype.encrypt = function (text) {
        return this._md5(text);
    };

    MD5.prototype._md5 = function(s){function L(k,d){return(k<<d)|(k>>>(32-d))}function K(G,k){var I,d,F,H,x;F=(G&2147483648);H=(k&2147483648);I=(G&1073741824);d=(k&1073741824);x=(G&1073741823)+(k&1073741823);if(I&d){return(x^2147483648^F^H)}if(I|d){if(x&1073741824){return(x^3221225472^F^H)}else{return(x^1073741824^F^H)}}else{return(x^F^H)}}function r(d,F,k){return(d&F)|((~d)&k)}function q(d,F,k){return(d&k)|(F&(~k))}function p(d,F,k){return(d^F^k)}function n(d,F,k){return(F^(d|(~k)))}function u(G,F,aa,Z,k,H,I){G=K(G,K(K(r(F,aa,Z),k),I));return K(L(G,H),F)}function f(G,F,aa,Z,k,H,I){G=K(G,K(K(q(F,aa,Z),k),I));return K(L(G,H),F)}function D(G,F,aa,Z,k,H,I){G=K(G,K(K(p(F,aa,Z),k),I));return K(L(G,H),F)}function t(G,F,aa,Z,k,H,I){G=K(G,K(K(n(F,aa,Z),k),I));return K(L(G,H),F)}function e(G){var Z;var F=G.length;var x=F+8;var k=(x-(x%64))/64;var I=(k+1)*16;var aa=Array(I-1);var d=0;var H=0;while(H<F){Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=(aa[Z]| (G.charCodeAt(H)<<d));H++}Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=aa[Z]|(128<<d);aa[I-2]=F<<3;aa[I-1]=F>>>29;return aa}function B(x){var k="",F="",G,d;for(d=0;d<=3;d++){G=(x>>>(d*8))&255;F="0"+G.toString(16);k=k+F.substr(F.length-2,2)}return k}function J(k){k=k.replace(/rn/g,"n");var d="";for(var F=0;F<k.length;F++){var x=k.charCodeAt(F);if(x<128){d+=String.fromCharCode(x)}else{if((x>127)&&(x<2048)){d+=String.fromCharCode((x>>6)|192);d+=String.fromCharCode((x&63)|128)}else{d+=String.fromCharCode((x>>12)|224);d+=String.fromCharCode(((x>>6)&63)|128);d+=String.fromCharCode((x&63)|128)}}}return d}var C=Array();var P,h,E,v,g,Y,X,W,V;var S=7,Q=12,N=17,M=22;var A=5,z=9,y=14,w=20;var o=4,m=11,l=16,j=23;var U=6,T=10,R=15,O=21;s=J(s);C=e(s);Y=1732584193;X=4023233417;W=2562383102;V=271733878;for(P=0;P<C.length;P+=16){h=Y;E=X;v=W;g=V;Y=u(Y,X,W,V,C[P+0],S,3614090360);V=u(V,Y,X,W,C[P+1],Q,3905402710);W=u(W,V,Y,X,C[P+2],N,606105819);X=u(X,W,V,Y,C[P+3],M,3250441966);Y=u(Y,X,W,V,C[P+4],S,4118548399);V=u(V,Y,X,W,C[P+5],Q,1200080426);W=u(W,V,Y,X,C[P+6],N,2821735955);X=u(X,W,V,Y,C[P+7],M,4249261313);Y=u(Y,X,W,V,C[P+8],S,1770035416);V=u(V,Y,X,W,C[P+9],Q,2336552879);W=u(W,V,Y,X,C[P+10],N,4294925233);X=u(X,W,V,Y,C[P+11],M,2304563134);Y=u(Y,X,W,V,C[P+12],S,1804603682);V=u(V,Y,X,W,C[P+13],Q,4254626195);W=u(W,V,Y,X,C[P+14],N,2792965006);X=u(X,W,V,Y,C[P+15],M,1236535329);Y=f(Y,X,W,V,C[P+1],A,4129170786);V=f(V,Y,X,W,C[P+6],z,3225465664);W=f(W,V,Y,X,C[P+11],y,643717713);X=f(X,W,V,Y,C[P+0],w,3921069994);Y=f(Y,X,W,V,C[P+5],A,3593408605);V=f(V,Y,X,W,C[P+10],z,38016083);W=f(W,V,Y,X,C[P+15],y,3634488961);X=f(X,W,V,Y,C[P+4],w,3889429448);Y=f(Y,X,W,V,C[P+9],A,568446438);V=f(V,Y,X,W,C[P+14],z,3275163606);W=f(W,V,Y,X,C[P+3],y,4107603335);X=f(X,W,V,Y,C[P+8],w,1163531501);Y=f(Y,X,W,V,C[P+13],A,2850285829);V=f(V,Y,X,W,C[P+2],z,4243563512);W=f(W,V,Y,X,C[P+7],y,1735328473);X=f(X,W,V,Y,C[P+12],w,2368359562);Y=D(Y,X,W,V,C[P+5],o,4294588738);V=D(V,Y,X,W,C[P+8],m,2272392833);W=D(W,V,Y,X,C[P+11],l,1839030562);X=D(X,W,V,Y,C[P+14],j,4259657740);Y=D(Y,X,W,V,C[P+1],o,2763975236);V=D(V,Y,X,W,C[P+4],m,1272893353);W=D(W,V,Y,X,C[P+7],l,4139469664);X=D(X,W,V,Y,C[P+10],j,3200236656);Y=D(Y,X,W,V,C[P+13],o,681279174);V=D(V,Y,X,W,C[P+0],m,3936430074);W=D(W,V,Y,X,C[P+3],l,3572445317);X=D(X,W,V,Y,C[P+6],j,76029189);Y=D(Y,X,W,V,C[P+9],o,3654602809);V=D(V,Y,X,W,C[P+12],m,3873151461);W=D(W,V,Y,X,C[P+15],l,530742520);X=D(X,W,V,Y,C[P+2],j,3299628645);Y=t(Y,X,W,V,C[P+0],U,4096336452);V=t(V,Y,X,W,C[P+7],T,1126891415);W=t(W,V,Y,X,C[P+14],R,2878612391);X=t(X,W,V,Y,C[P+5],O,4237533241);Y=t(Y,X,W,V,C[P+12],U,1700485571);V=t(V,Y,X,W,C[P+3],T,2399980690);W=t(W,V,Y,X,C[P+10],R,4293915773);X=t(X,W,V,Y,C[P+1],O,2240044497);Y=t(Y,X,W,V,C[P+8],U,1873313359);V=t(V,Y,X,W,C[P+15],T,4264355552);W=t(W,V,Y,X,C[P+6],R,2734768916);X=t(X,W,V,Y,C[P+13],O,1309151649);Y=t(Y,X,W,V,C[P+4],U,4149444226);V=t(V,Y,X,W,C[P+11],T,3174756917);W=t(W,V,Y,X,C[P+2],R,718787259);X=t(X,W,V,Y,C[P+9],O,3951481745);Y=K(Y,h);X=K(X,E);W=K(W,v);V=K(V,g)}var i=B(Y)+B(X)+B(W)+B(V);return i.toLowerCase()};

    return MD5;
})();

var SHA1 = (function () {
    function SHA1() {
    }

    /**
     * SHA1 Encrypt
     * @param {string} text
     * @returns {string} 
     */
    SHA1.prototype.encrypt = function (text) {
        return this._sha1(text);
    };

    SHA1.prototype._sha1 = function SHA1(msg) { function rotate_left(n, s) { var t4 = (n << s) | (n >>> (32 - s)); return t4; }; function lsb_hex(val) { var str = ""; var i; var vh; var vl; for (i = 0; i <= 6; i += 2) { vh = (val >>> (i * 4 + 4)) & 0x0f; vl = (val >>> (i * 4)) & 0x0f; str += vh.toString(16) + vl.toString(16); } return str; }; function cvt_hex(val) { var str = ""; var i; var v; for (i = 7; i >= 0; i--) { v = (val >>> (i * 4)) & 0x0f; str += v.toString(16); } return str; }; function Utf8Encode(string) { string = string.replace(/\r\n/g, "\n"); var utftext = ""; for (var n = 0; n < string.length; n++) { var c = string.charCodeAt(n); if (c < 128) { utftext += String.fromCharCode(c); } else if ((c > 127) && (c < 2048)) { utftext += String.fromCharCode((c >> 6) | 192); utftext += String.fromCharCode((c & 63) | 128); } else { utftext += String.fromCharCode((c >> 12) | 224); utftext += String.fromCharCode(((c >> 6) & 63) | 128); utftext += String.fromCharCode((c & 63) | 128); } } return utftext; }; var blockstart; var i, j; var W = new Array(80); var H0 = 0x67452301; var H1 = 0xEFCDAB89; var H2 = 0x98BADCFE; var H3 = 0x10325476; var H4 = 0xC3D2E1F0; var A, B, C, D, E; var temp; msg = Utf8Encode(msg); var msg_len = msg.length; var word_array = new Array(); for (i = 0; i < msg_len - 3; i += 4) { j = msg.charCodeAt(i) << 24 | msg.charCodeAt(i + 1) << 16 | msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3); word_array.push(j); } switch (msg_len % 4) { case 0: i = 0x080000000; break; case 1: i = msg.charCodeAt(msg_len - 1) << 24 | 0x0800000; break; case 2: i = msg.charCodeAt(msg_len - 2) << 24 | msg.charCodeAt(msg_len - 1) << 16 | 0x08000; break; case 3: i = msg.charCodeAt(msg_len - 3) << 24 | msg.charCodeAt(msg_len - 2) << 16 | msg.charCodeAt(msg_len - 1) << 8 | 0x80; break; } word_array.push(i); while ((word_array.length % 16) != 14) word_array.push(0); word_array.push(msg_len >>> 29); word_array.push((msg_len << 3) & 0x0ffffffff); for (blockstart = 0; blockstart < word_array.length; blockstart += 16) { for (i = 0; i < 16; i++) W[i] = word_array[blockstart + i]; for (i = 16; i <= 79; i++) W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1); A = H0; B = H1; C = H2; D = H3; E = H4; for (i = 0; i <= 19; i++) { temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff; E = D; D = C; C = rotate_left(B, 30); B = A; A = temp; } for (i = 20; i <= 39; i++) { temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff; E = D; D = C; C = rotate_left(B, 30); B = A; A = temp; } for (i = 40; i <= 59; i++) { temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff; E = D; D = C; C = rotate_left(B, 30); B = A; A = temp; } for (i = 60; i <= 79; i++) { temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff; E = D; D = C; C = rotate_left(B, 30); B = A; A = temp; } H0 = (H0 + A) & 0x0ffffffff; H1 = (H1 + B) & 0x0ffffffff; H2 = (H2 + C) & 0x0ffffffff; H3 = (H3 + D) & 0x0ffffffff; H4 = (H4 + E) & 0x0ffffffff; } var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4); return temp.toLowerCase(); }

    return SHA1;
})();

var SHA256 = (function () {
    function SHA256() {
    }

    /**
     * SHA256 Encrypt
     * @param {string} text
     * @returns {string} 
     */
    SHA256.prototype.encrypt = function (text) {
        return this._sha256(text);
    };

    SHA256.prototype._sha256 = function (s) { var chrsz = 8; var hexcase = 0; function safe_add(x, y) { var lsw = (x & 0xFFFF) + (y & 0xFFFF); var msw = (x >> 16) + (y >> 16) + (lsw >> 16); return (msw << 16) | (lsw & 0xFFFF); } function S(X, n) { return (X >>> n) | (X << (32 - n)); } function R(X, n) { return (X >>> n); } function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); } function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); } function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); } function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); } function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); } function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); } function core_sha256(m, l) { var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2); var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19); var W = new Array(64); var a, b, c, d, e, f, g, h, i, j; var T1, T2; m[l >> 5] |= 0x80 << (24 - l % 32); m[((l + 64 >> 9) << 4) + 15] = l; for (var i = 0; i < m.length; i += 16) { a = HASH[0]; b = HASH[1]; c = HASH[2]; d = HASH[3]; e = HASH[4]; f = HASH[5]; g = HASH[6]; h = HASH[7]; for (var j = 0; j < 64; j++) { if (j < 16) W[j] = m[j + i]; else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]); T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]); T2 = safe_add(Sigma0256(a), Maj(a, b, c)); h = g; g = f; f = e; e = safe_add(d, T1); d = c; c = b; b = a; a = safe_add(T1, T2); } HASH[0] = safe_add(a, HASH[0]); HASH[1] = safe_add(b, HASH[1]); HASH[2] = safe_add(c, HASH[2]); HASH[3] = safe_add(d, HASH[3]); HASH[4] = safe_add(e, HASH[4]); HASH[5] = safe_add(f, HASH[5]); HASH[6] = safe_add(g, HASH[6]); HASH[7] = safe_add(h, HASH[7]); } return HASH; } function str2binb(str) { var bin = Array(); var mask = (1 << chrsz) - 1; for (var i = 0; i < str.length * chrsz; i += chrsz) { bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32); } return bin; } function Utf8Encode(string) { string = string.replace(/\r\n/g, "\n"); var utftext = ""; for (var n = 0; n < string.length; n++) { var c = string.charCodeAt(n); if (c < 128) { utftext += String.fromCharCode(c); } else if ((c > 127) && (c < 2048)) { utftext += String.fromCharCode((c >> 6) | 192); utftext += String.fromCharCode((c & 63) | 128); } else { utftext += String.fromCharCode((c >> 12) | 224); utftext += String.fromCharCode(((c >> 6) & 63) | 128); utftext += String.fromCharCode((c & 63) | 128); } } return utftext; } function binb2hex(binarray) { var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef"; var str = ""; for (var i = 0; i < binarray.length * 4; i++) { str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF); } return str; } s = Utf8Encode(s); return binb2hex(core_sha256(str2binb(s), s.length * chrsz)); }

    return SHA256;
})();

var SHA512 = (function () {
    function SHA512() {
    }

    /**
    * SHA512 Encrypt
    * @param {string} text
    * @returns {string} 
    */
    SHA512.prototype.encrypt = function (text) {
        return this._sha512(text);
    };

    SHA512.prototype._sha512 = function SHA512(str) { function int64(msint_32, lsint_32) { this.highOrder = msint_32; this.lowOrder = lsint_32; } var H = [new int64(0x6a09e667, 0xf3bcc908), new int64(0xbb67ae85, 0x84caa73b), new int64(0x3c6ef372, 0xfe94f82b), new int64(0xa54ff53a, 0x5f1d36f1), new int64(0x510e527f, 0xade682d1), new int64(0x9b05688c, 0x2b3e6c1f), new int64(0x1f83d9ab, 0xfb41bd6b), new int64(0x5be0cd19, 0x137e2179)]; var K = [new int64(0x428a2f98, 0xd728ae22), new int64(0x71374491, 0x23ef65cd), new int64(0xb5c0fbcf, 0xec4d3b2f), new int64(0xe9b5dba5, 0x8189dbbc), new int64(0x3956c25b, 0xf348b538), new int64(0x59f111f1, 0xb605d019), new int64(0x923f82a4, 0xaf194f9b), new int64(0xab1c5ed5, 0xda6d8118), new int64(0xd807aa98, 0xa3030242), new int64(0x12835b01, 0x45706fbe), new int64(0x243185be, 0x4ee4b28c), new int64(0x550c7dc3, 0xd5ffb4e2), new int64(0x72be5d74, 0xf27b896f), new int64(0x80deb1fe, 0x3b1696b1), new int64(0x9bdc06a7, 0x25c71235), new int64(0xc19bf174, 0xcf692694), new int64(0xe49b69c1, 0x9ef14ad2), new int64(0xefbe4786, 0x384f25e3), new int64(0x0fc19dc6, 0x8b8cd5b5), new int64(0x240ca1cc, 0x77ac9c65), new int64(0x2de92c6f, 0x592b0275), new int64(0x4a7484aa, 0x6ea6e483), new int64(0x5cb0a9dc, 0xbd41fbd4), new int64(0x76f988da, 0x831153b5), new int64(0x983e5152, 0xee66dfab), new int64(0xa831c66d, 0x2db43210), new int64(0xb00327c8, 0x98fb213f), new int64(0xbf597fc7, 0xbeef0ee4), new int64(0xc6e00bf3, 0x3da88fc2), new int64(0xd5a79147, 0x930aa725), new int64(0x06ca6351, 0xe003826f), new int64(0x14292967, 0x0a0e6e70), new int64(0x27b70a85, 0x46d22ffc), new int64(0x2e1b2138, 0x5c26c926), new int64(0x4d2c6dfc, 0x5ac42aed), new int64(0x53380d13, 0x9d95b3df), new int64(0x650a7354, 0x8baf63de), new int64(0x766a0abb, 0x3c77b2a8), new int64(0x81c2c92e, 0x47edaee6), new int64(0x92722c85, 0x1482353b), new int64(0xa2bfe8a1, 0x4cf10364), new int64(0xa81a664b, 0xbc423001), new int64(0xc24b8b70, 0xd0f89791), new int64(0xc76c51a3, 0x0654be30), new int64(0xd192e819, 0xd6ef5218), new int64(0xd6990624, 0x5565a910), new int64(0xf40e3585, 0x5771202a), new int64(0x106aa070, 0x32bbd1b8), new int64(0x19a4c116, 0xb8d2d0c8), new int64(0x1e376c08, 0x5141ab53), new int64(0x2748774c, 0xdf8eeb99), new int64(0x34b0bcb5, 0xe19b48a8), new int64(0x391c0cb3, 0xc5c95a63), new int64(0x4ed8aa4a, 0xe3418acb), new int64(0x5b9cca4f, 0x7763e373), new int64(0x682e6ff3, 0xd6b2b8a3), new int64(0x748f82ee, 0x5defb2fc), new int64(0x78a5636f, 0x43172f60), new int64(0x84c87814, 0xa1f0ab72), new int64(0x8cc70208, 0x1a6439ec), new int64(0x90befffa, 0x23631e28), new int64(0xa4506ceb, 0xde82bde9), new int64(0xbef9a3f7, 0xb2c67915), new int64(0xc67178f2, 0xe372532b), new int64(0xca273ece, 0xea26619c), new int64(0xd186b8c7, 0x21c0c207), new int64(0xeada7dd6, 0xcde0eb1e), new int64(0xf57d4f7f, 0xee6ed178), new int64(0x06f067aa, 0x72176fba), new int64(0x0a637dc5, 0xa2c898a6), new int64(0x113f9804, 0xbef90dae), new int64(0x1b710b35, 0x131c471b), new int64(0x28db77f5, 0x23047d84), new int64(0x32caab7b, 0x40c72493), new int64(0x3c9ebe0a, 0x15c9bebc), new int64(0x431d67c4, 0x9c100d4c), new int64(0x4cc5d4be, 0xcb3e42b6), new int64(0x597f299c, 0xfc657e2a), new int64(0x5fcb6fab, 0x3ad6faec), new int64(0x6c44198c, 0x4a475817)]; var W = new Array(64); var a, b, c, d, e, f, g, h, i, j; var T1, T2; var charsize = 8; function utf8_encode(str) { return unescape(encodeURIComponent(str)); } function str2binb(str) { var bin = []; var mask = (1 << charsize) - 1; var len = str.length * charsize; for (var i = 0; i < len; i += charsize) { bin[i >> 5] |= (str.charCodeAt(i / charsize) & mask) << (32 - charsize - (i % 32)); } return bin; } function binb2hex(binarray) { var hex_tab = "0123456789abcdef"; var str = ""; var length = binarray.length * 4; var srcByte; for (var i = 0; i < length; i += 1) { srcByte = binarray[i >> 2] >> ((3 - (i % 4)) * 8); str += hex_tab.charAt((srcByte >> 4) & 0xF) + hex_tab.charAt(srcByte & 0xF); } return str; } function safe_add_2(x, y) { var lsw, msw, lowOrder, highOrder; lsw = (x.lowOrder & 0xFFFF) + (y.lowOrder & 0xFFFF); msw = (x.lowOrder >>> 16) + (y.lowOrder >>> 16) + (lsw >>> 16); lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF); lsw = (x.highOrder & 0xFFFF) + (y.highOrder & 0xFFFF) + (msw >>> 16); msw = (x.highOrder >>> 16) + (y.highOrder >>> 16) + (lsw >>> 16); highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF); return new int64(highOrder, lowOrder); } function safe_add_4(a, b, c, d) { var lsw, msw, lowOrder, highOrder; lsw = (a.lowOrder & 0xFFFF) + (b.lowOrder & 0xFFFF) + (c.lowOrder & 0xFFFF) + (d.lowOrder & 0xFFFF); msw = (a.lowOrder >>> 16) + (b.lowOrder >>> 16) + (c.lowOrder >>> 16) + (d.lowOrder >>> 16) + (lsw >>> 16); lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF); lsw = (a.highOrder & 0xFFFF) + (b.highOrder & 0xFFFF) + (c.highOrder & 0xFFFF) + (d.highOrder & 0xFFFF) + (msw >>> 16); msw = (a.highOrder >>> 16) + (b.highOrder >>> 16) + (c.highOrder >>> 16) + (d.highOrder >>> 16) + (lsw >>> 16); highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF); return new int64(highOrder, lowOrder); } function safe_add_5(a, b, c, d, e) { var lsw, msw, lowOrder, highOrder; lsw = (a.lowOrder & 0xFFFF) + (b.lowOrder & 0xFFFF) + (c.lowOrder & 0xFFFF) + (d.lowOrder & 0xFFFF) + (e.lowOrder & 0xFFFF); msw = (a.lowOrder >>> 16) + (b.lowOrder >>> 16) + (c.lowOrder >>> 16) + (d.lowOrder >>> 16) + (e.lowOrder >>> 16) + (lsw >>> 16); lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF); lsw = (a.highOrder & 0xFFFF) + (b.highOrder & 0xFFFF) + (c.highOrder & 0xFFFF) + (d.highOrder & 0xFFFF) + (e.highOrder & 0xFFFF) + (msw >>> 16); msw = (a.highOrder >>> 16) + (b.highOrder >>> 16) + (c.highOrder >>> 16) + (d.highOrder >>> 16) + (e.highOrder >>> 16) + (lsw >>> 16); highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF); return new int64(highOrder, lowOrder); } function maj(x, y, z) { return new int64((x.highOrder & y.highOrder) ^ (x.highOrder & z.highOrder) ^ (y.highOrder & z.highOrder), (x.lowOrder & y.lowOrder) ^ (x.lowOrder & z.lowOrder) ^ (y.lowOrder & z.lowOrder)); } function ch(x, y, z) { return new int64((x.highOrder & y.highOrder) ^ (~x.highOrder & z.highOrder), (x.lowOrder & y.lowOrder) ^ (~x.lowOrder & z.lowOrder)); } function rotr(x, n) { if (n <= 32) { return new int64((x.highOrder >>> n) | (x.lowOrder << (32 - n)), (x.lowOrder >>> n) | (x.highOrder << (32 - n))); } else { return new int64((x.lowOrder >>> n) | (x.highOrder << (32 - n)), (x.highOrder >>> n) | (x.lowOrder << (32 - n))); } } function sigma0(x) { var rotr28 = rotr(x, 28); var rotr34 = rotr(x, 34); var rotr39 = rotr(x, 39); return new int64(rotr28.highOrder ^ rotr34.highOrder ^ rotr39.highOrder, rotr28.lowOrder ^ rotr34.lowOrder ^ rotr39.lowOrder); } function sigma1(x) { var rotr14 = rotr(x, 14); var rotr18 = rotr(x, 18); var rotr41 = rotr(x, 41); return new int64(rotr14.highOrder ^ rotr18.highOrder ^ rotr41.highOrder, rotr14.lowOrder ^ rotr18.lowOrder ^ rotr41.lowOrder); } function gamma0(x) { var rotr1 = rotr(x, 1), rotr8 = rotr(x, 8), shr7 = shr(x, 7); return new int64(rotr1.highOrder ^ rotr8.highOrder ^ shr7.highOrder, rotr1.lowOrder ^ rotr8.lowOrder ^ shr7.lowOrder); } function gamma1(x) { var rotr19 = rotr(x, 19); var rotr61 = rotr(x, 61); var shr6 = shr(x, 6); return new int64(rotr19.highOrder ^ rotr61.highOrder ^ shr6.highOrder, rotr19.lowOrder ^ rotr61.lowOrder ^ shr6.lowOrder); } function shr(x, n) { if (n <= 32) { return new int64(x.highOrder >>> n, x.lowOrder >>> n | (x.highOrder << (32 - n))); } else { return new int64(0, x.highOrder << (32 - n)); } } str = utf8_encode(str); strlen = str.length * charsize; str = str2binb(str); str[strlen >> 5] |= 0x80 << (24 - strlen % 32); str[(((strlen + 128) >> 10) << 5) + 31] = strlen; for (var i = 0; i < str.length; i += 32) { a = H[0]; b = H[1]; c = H[2]; d = H[3]; e = H[4]; f = H[5]; g = H[6]; h = H[7]; for (var j = 0; j < 80; j++) { if (j < 16) { W[j] = new int64(str[j * 2 + i], str[j * 2 + i + 1]); } else { W[j] = safe_add_4(gamma1(W[j - 2]), W[j - 7], gamma0(W[j - 15]), W[j - 16]); } T1 = safe_add_5(h, sigma1(e), ch(e, f, g), K[j], W[j]); T2 = safe_add_2(sigma0(a), maj(a, b, c)); h = g; g = f; f = e; e = safe_add_2(d, T1); d = c; c = b; b = a; a = safe_add_2(T1, T2); } H[0] = safe_add_2(a, H[0]); H[1] = safe_add_2(b, H[1]); H[2] = safe_add_2(c, H[2]); H[3] = safe_add_2(d, H[3]); H[4] = safe_add_2(e, H[4]); H[5] = safe_add_2(f, H[5]); H[6] = safe_add_2(g, H[6]); H[7] = safe_add_2(h, H[7]); } var binarray = []; for (var i = 0; i < H.length; i++) { binarray.push(H[i].highOrder); binarray.push(H[i].lowOrder); } return binb2hex(binarray); }

    return SHA512;
})();