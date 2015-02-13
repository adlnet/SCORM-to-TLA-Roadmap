<?xml version="1.0" encoding="UTF-8"?><!-- DWXMLSource="about.xml" -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
	<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
	
	<xsl:template match="about">
		<html>
			<body>
				<font color="#000000" face="Arial, Helvetica, sans-serif">
					<xsl:value-of select="."/>
				</font>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>

