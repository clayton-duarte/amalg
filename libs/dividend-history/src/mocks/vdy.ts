import { DividendData } from '../lib/dividend-history';
import { DeepReadonly } from '../types';

export const html = `
<!DOCTYPE html>
<html lang="en">

<head>
		<meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="utf-8">
    <meta name="description" content="Dividend History | Yields, dates, complete payout history and stock information"/>
	<meta name="keywords" content="dividend date history yield calendar VDY Vanguard FTSE Canadian High Dividend Yield Index "/>
	<meta property="og:title" content="Dividend History" />
	<meta property="og:url" content="http://dividendhistory.org" />
	<meta property="og:description" content="Dividend History | Yields, dates, complete payout history and stock information" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="http://dividendhistory.org/thumbnail.png" />		
	<link rel="shortcut icon" href="/favicon.ico">	<title>Dividend History | VDY Vanguard FTSE Canadian High Dividend Yield Index  Payout Date</title>
		<!-- Google tag (gtag.js) -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-YGXZGLQLES"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());

		gtag('config', 'G-YGXZGLQLES');
	</script>
	<script data-ad-client="ca-pub-7749727118045578" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>

	<script src="/bower_components/jquery/dist/jquery.min.js"></script>
	<link href="/bower_components/bootstrap/dist/css/bootstrap.css" rel="stylesheet">
	<script src="/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
	<script src="/bower_components/typeahead/typeahead.0.11.1.bundle.js"></script>
	<script src="/bower_components/handlebars/handlebars.min.js"></script>
	<script src="/bower_components/search.js"></script>
	<script src="/bower_components/datatables/media/js/jquery.dataTables.min.js"></script>
	<link href="/bower_components/datatables-plugins/integration/bootstrap/3/dataTables.bootstrap.css" rel="stylesheet">
	<link href="/bower_components/flag-icon-css/css/flag-icon.min.css" rel="stylesheet">
	<link href="/css/custom.css" rel="stylesheet">
	<link href="/css/typeaheadjs.css" rel="stylesheet">
	<!-- Start of StatCounter Code for Default Guide -->
	<script type="text/javascript">
		var sc_project=8131528;
		var sc_invisible=1;
		var sc_security="7c38280d";
	</script>
	<script type="text/javascript" src="https://www.statcounter.com/counter/counter.js"></script>
	<!-- End of StatCounter Code for Default Guide -->
	<script>
		$(function () {
		  $('[data-toggle="tooltip"]').tooltip();
		});
	</script>

</head>
<body>
	<div class="container-fluid">
				<nav class="navbar navbar-default">
			<div class="container-fluid">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="/">Dividend History</a>
				</div>
				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul class="nav navbar-nav">
						<li><a href="/calendar/"><i class="glyphicon glyphicon-calendar"></i> Dividend Calendar</a></li>
						<li><a href="/report/"><i class="glyphicon glyphicon-list-alt"></i> Dividend Reports</a></li>
						<li><a href="/announcements/"><i class="glyphicon glyphicon-star"></i> Dividend Announcements</a></li>
						<li class="dropdown">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="glyphicon glyphicon-globe"></i> Browse Dividend Stocks <span class="caret"></span></a>
							<ul class="dropdown-menu" role="menu">
								<li><a href="/popular-dividend-stocks/" title="">Top 10 Most Popular Dividend Stocks</a></li>
								<li><a href="/high-yield-dividend-stocks/" title="">High Dividend Stocks</a></li>
								<li><a href="/quality-dividend-stocks/" title="">Best Quality Dividend Stocks</a></li>
								<li><a href="/monthly-payout/" title="">Monthly Payout</a></li>
								<li><a href="/snp500/" title="">S&amp;P 500</a></li>
						 		<li><a href="/nyse/" title="">NYSE</a></li>
						 		<li><a href="/nasdaq/" title="">Nasdaq</a></li>
						 		<li><a href="/tsx/" title="">Canadian TSX</a></li>
						 		<li><a href="/lse/" title="">United Kingdom LSE</a></li>
						 		<li><a href="/asx/" title="">Australian ASX</a></li>
							</ul>
						</li>
						<!--
						<li class="dropdown">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Dividend Information <span class="caret"></span></a>
							<ul class="dropdown-menu" role="menu">
								<li><a href="/what-are-dividends/" title="">What are Dividends?</a></li>
								<li><a href="/dividend-funds/" title="">Dividend Funds</a></li>
								<li><a href="/drip/" title="">DRIP</a></li>
						 		<li><a href="/dividend-types/" title="">Types of Dividends</a></li>
						 		<li><a href="/ex-dividend/" title="">Ex-Dividend Date</a></li>
						 		<li><a href="/tax/" title="">Dividend Tax</a></li>
						 		<li><a href="/qualified/" title="">Qualified Dividends</a></li>
						 		<li><a href="/eligible/" title="">Eligible Dividends</a></li>
						 		<li><a href="/payout/" title="">Payout Schedule</a></li>
						 		<li><a href="/glossary/" title="">Glossary</a></li>
							</ul>
						</li>
						-->
						<li><a href="/contact/">Contact</a></li>
					</ul>
				</div><!-- /.navbar-collapse -->
			</div><!-- /.container-fluid -->
		</nav>
				<div class="row">
			<div class="col-md-2">
			</div>
			<div class="col-md-5">
				 
					<h4>Vanguard FTSE Canadian High Dividend Yield Index  ( VDY )</h4>
								
			</div>
			<div class="col-md-5">
				<form>
					<div class="input-group">
						<input type="text" class="form-control typeahead" id="typeahead-search" placeholder="Search by Symbol or Company" >
						<span id="typeahead-clear" class="input-group-addon">
							<i class="glyphicon glyphicon-search"></i>
						</span>
					</div>
					<div id="search-spacer" class="visible-xs visible-sm">
					</div>
				</form>
			</div>
		</div>
				<div class="row">
			<div class="col-md-2 hidden-xs hidden-sm">
				<div class="leftad">
					<!-- NEW -->
					<!-- dividend_history_responsive_left -->
					<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
					<ins class="adsbygoogle"
					     style="display:block"
					     data-ad-client="ca-pub-7749727118045578"
					     data-ad-slot="3833971346"
					     data-ad-format="auto"></ins>
					<script>
					(adsbygoogle = window.adsbygoogle || []).push({});
					</script>
				</div>
			</div>

			<div class="col-md-8 col-xs-12 col-sm-12">
				<p>News/Announcments: None				</p>
				<p>Updated: 2023-05-12</p>
				<p>Last Close Price: $42.10</p>
								
				<p>Yield: 4.56%</p> 
				<p>Payout Ratio: --</p> 
				<p>PE Ratio: 11.2</p> 
				<p>Market Cap: 2.1B</p> 
				<!-- for companies with an irregular dividend the trailing yield is a better metric-->
				<p>Frequency: Monthly</p>
				<p>Dividend History (adjusted for splits)</p>
				<script type="text/javascript">
					$(document).ready(function() {
				    	$('#dividend_table').dataTable({
							"paging":   true,
							"pagingType": "simple",
							"ordering": false,
							"info":     false,
							"searching":false,
							"lengthMenu": [15],
							"lengthChange": false	    		
				    	});
					} );
				</script>
				<table id='dividend_table' class='table table-striped table-bordered'>
<thead>
<tr>
<th>Ex-Dividend Date</th><th>Payout Date</th><th>Cash Amount</th><th>% Change</th>
</tr>
</thead>
<tbody>
<tr>
					<td><i>2023-06-30</i></td>
					<td><i>2023-07-11</i></td>
					<td><i>$0.16198**</i></td>
					<td><i>unconfirmed/estimated</i></td>
					</tr><tr>
					<td><i>2023-05-31</i></td>
					<td><i>2023-06-08</i></td>
					<td><i>$0.16198**</i></td>
					<td><i>unconfirmed/estimated</i></td>
					</tr>	<tr>
		<td>2023-04-28</td>
		<td>2023-05-08</td>
		<td>$0.16198</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>4.17%</td>
</tr>	<tr>
		<td>2023-03-31</td>
		<td>2023-04-10</td>
		<td>$0.155496</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-9.42%</td>
</tr>	<tr>
		<td>2023-02-28</td>
		<td>2023-03-08</td>
		<td>$0.171674</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>1.36%</td>
</tr>	<tr>
		<td>2023-01-31</td>
		<td>2023-02-08</td>
		<td>$0.169373</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>14.46%</td>
</tr>	<tr>
		<td>2022-12-29</td>
		<td>2023-01-09</td>
		<td>$0.147973</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-21.50%</td>
</tr>	<tr style='background-color:#ded5f7;'>
		<td>2022-12-29</td>
		<td>2023-01-09</td>
		<td>$1.5034284</td>
		<td>Special dividend</td>
</tr>	<tr>
		<td>2022-11-30</td>
		<td>2022-12-08</td>
		<td>$0.18849</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>59.58%</td>
</tr>	<tr>
		<td>2022-10-31</td>
		<td>2022-11-08</td>
		<td>$0.118113</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-42.91%</td>
</tr>	<tr>
		<td>2022-09-30</td>
		<td>2022-10-11</td>
		<td>$0.206904</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>18.31%</td>
</tr>	<tr>
		<td>2022-08-31</td>
		<td>2022-09-09</td>
		<td>$0.174877</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>38.69%</td>
</tr>	<tr>
		<td>2022-07-29</td>
		<td>2022-08-09</td>
		<td>$0.126094</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-19.70%</td>
</tr>	<tr>
		<td>2022-06-30</td>
		<td>2022-07-11</td>
		<td>$0.157027</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>11.89%</td>
</tr>	<tr>
		<td>2022-05-31</td>
		<td>2022-06-08</td>
		<td>$0.140337</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>22.02%</td>
</tr>	<tr>
		<td>2022-04-29</td>
		<td>2022-05-09</td>
		<td>$0.11501</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-25.80%</td>
</tr>	<tr>
		<td>2022-03-31</td>
		<td>2022-04-08</td>
		<td>$0.155</td>
		<td></td>
</tr>	<tr>
		<td>2022-02-28</td>
		<td>2022-03-08</td>
		<td>$0.155</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>13.14%</td>
</tr>	<tr>
		<td>2022-01-31</td>
		<td>2022-02-08</td>
		<td>$0.137</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>12.30%</td>
</tr>	<tr>
		<td>2021-12-30</td>
		<td>2022-01-10</td>
		<td>$0.122</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-13.48%</td>
</tr>	<tr style='background-color:#ded5f7;'>
		<td>2021-12-30</td>
		<td>2022-01-10</td>
		<td>$0.158938</td>
		<td>Special dividend</td>
</tr>	<tr>
		<td>2021-11-30</td>
		<td>2021-12-08</td>
		<td>$0.141</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>50.00%</td>
</tr>	<tr>
		<td>2021-10-29</td>
		<td>2021-11-08</td>
		<td>$0.094</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-38.56%</td>
</tr>	<tr>
		<td>2021-09-29</td>
		<td>2021-10-08</td>
		<td>$0.153</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>5.52%</td>
</tr>	<tr>
		<td>2021-08-31</td>
		<td>2021-09-09</td>
		<td>$0.145</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>62.92%</td>
</tr>	<tr>
		<td>2021-07-30</td>
		<td>2021-08-10</td>
		<td>$0.089</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-42.21%</td>
</tr>	<tr>
		<td>2021-06-30</td>
		<td>2021-07-09</td>
		<td>$0.154</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>10.79%</td>
</tr>	<tr>
		<td>2021-05-28</td>
		<td>2021-06-07</td>
		<td>$0.139</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>54.44%</td>
</tr>	<tr>
		<td>2021-04-30</td>
		<td>2021-05-10</td>
		<td>$0.09</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-39.19%</td>
</tr>	<tr>
		<td>2021-03-31</td>
		<td>2021-04-09</td>
		<td>$0.148</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-8.64%</td>
</tr>	<tr>
		<td>2021-02-26</td>
		<td>2021-03-08</td>
		<td>$0.162</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>54.29%</td>
</tr>	<tr>
		<td>2021-01-29</td>
		<td>2021-02-08</td>
		<td>$0.105</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-6.42%</td>
</tr>	<tr>
		<td>2020-12-30</td>
		<td>2021-01-08</td>
		<td>$0.1122</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-28.17%</td>
</tr>	<tr>
		<td>2020-11-30</td>
		<td>2020-12-08</td>
		<td>$0.1562</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>84.20%</td>
</tr>	<tr>
		<td>2020-10-30</td>
		<td>2020-11-09</td>
		<td>$0.0848</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-35.27%</td>
</tr>	<tr>
		<td>2020-09-30</td>
		<td>2020-10-08</td>
		<td>$0.131</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-13.40%</td>
</tr>	<tr>
		<td>2020-08-31</td>
		<td>2020-09-09</td>
		<td>$0.151274</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>48.75%</td>
</tr>	<tr>
		<td>2020-07-31</td>
		<td>2020-08-11</td>
		<td>$0.101699</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-23.65%</td>
</tr>	<tr>
		<td>2020-06-22</td>
		<td>2020-06-30</td>
		<td>$0.133207</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-26.20%</td>
</tr>	<tr>
		<td>2020-05-29</td>
		<td>2020-06-08</td>
		<td>$0.180497</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>110.61%</td>
</tr>	<tr>
		<td>2020-04-30</td>
		<td>2020-05-08</td>
		<td>$0.0857</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-27.50%</td>
</tr>	<tr>
		<td>2020-03-31</td>
		<td>2020-04-08</td>
		<td>$0.1182</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-26.26%</td>
</tr>	<tr>
		<td>2020-02-28</td>
		<td>2020-03-09</td>
		<td>$0.1603</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>80.72%</td>
</tr>	<tr>
		<td>2020-01-31</td>
		<td>2020-02-10</td>
		<td>$0.0887</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-29.94%</td>
</tr>	<tr>
		<td>2019-12-30</td>
		<td>2020-01-08</td>
		<td>$0.1266</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-19.36%</td>
</tr>	<tr>
		<td>2019-11-29</td>
		<td>2019-12-09</td>
		<td>$0.157</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>190.74%</td>
</tr>	<tr>
		<td>2019-10-31</td>
		<td>2019-11-11</td>
		<td>$0.054</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-50.00%</td>
</tr>	<tr>
		<td>2019-09-30</td>
		<td>2019-10-08</td>
		<td>$0.108</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-47.06%</td>
</tr>	<tr>
		<td>2019-08-30</td>
		<td>2019-09-10</td>
		<td>$0.204</td>
		<td></td>
</tr>	<tr>
		<td>2019-07-31</td>
		<td>2019-08-09</td>
		<td>$0.0532</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-66.11%</td>
</tr>	<tr>
		<td>2019-06-28</td>
		<td>2019-07-09</td>
		<td>$0.157</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-20.91%</td>
</tr>	<tr>
		<td>2019-05-31</td>
		<td>2019-06-10</td>
		<td>$0.1985</td>
		<td></td>
</tr>	<tr>
		<td>2019-04-30</td>
		<td>2019-05-08</td>
		<td>$0.05</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-67.11%</td>
</tr>	<tr>
		<td>2019-03-29</td>
		<td>2019-04-08</td>
		<td>$0.152</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>9.35%</td>
</tr>	<tr>
		<td>2019-02-28</td>
		<td>2019-03-08</td>
		<td>$0.139</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>69.51%</td>
</tr>	<tr>
		<td>2019-01-30</td>
		<td>2019-02-07</td>
		<td>$0.082</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>15.98%</td>
</tr>	<tr>
		<td>2018-12-28</td>
		<td>2019-01-08</td>
		<td>$0.0707</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-62.31%</td>
</tr>	<tr>
		<td>2018-11-30</td>
		<td>2018-12-10</td>
		<td>$0.1876</td>
		<td></td>
</tr>	<tr>
		<td>2018-10-31</td>
		<td>2018-11-07</td>
		<td>$0.0513</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-51.19%</td>
</tr>	<tr>
		<td>2018-09-28</td>
		<td>2018-10-09</td>
		<td>$0.1051</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-44.10%</td>
</tr>	<tr>
		<td>2018-08-31</td>
		<td>2018-09-11</td>
		<td>$0.188</td>
		<td></td>
</tr>	<tr>
		<td>2018-07-31</td>
		<td>2018-08-09</td>
		<td>$0.0525</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-44.39%</td>
</tr>	<tr>
		<td>2018-06-29</td>
		<td>2018-07-11</td>
		<td>$0.0944</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-50.08%</td>
</tr>	<tr>
		<td>2018-05-31</td>
		<td>2018-06-08</td>
		<td>$0.1891</td>
		<td></td>
</tr>	<tr>
		<td>2018-04-30</td>
		<td>2018-05-08</td>
		<td>$0.0552</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-60.26%</td>
</tr>	<tr>
		<td>2018-03-29</td>
		<td>2018-04-09</td>
		<td>$0.1389</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>9.20%</td>
</tr>	<tr>
		<td>2018-02-26</td>
		<td>2018-03-06</td>
		<td>$0.1272</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>80.43%</td>
</tr>	<tr>
		<td>2018-01-29</td>
		<td>2018-02-06</td>
		<td>$0.0705</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-38.86%</td>
</tr>	<tr>
		<td>2017-12-28</td>
		<td>2018-01-08</td>
		<td>$0.1153</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-17.64%</td>
</tr>	<tr>
		<td>2017-11-27</td>
		<td>2017-12-08</td>
		<td>$0.14</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>164.15%</td>
</tr>	<tr>
		<td>2017-10-20</td>
		<td>2017-10-30</td>
		<td>$0.053</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-52.25%</td>
</tr>	<tr>
		<td>2017-09-20</td>
		<td>2017-09-28</td>
		<td>$0.111</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-22.81%</td>
</tr>	<tr>
		<td>2017-08-22</td>
		<td>2017-08-31</td>
		<td>$0.1438</td>
		<td></td>
</tr>	<tr>
		<td>2017-07-21</td>
		<td>2017-08-01</td>
		<td>$0.047</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-59.27%</td>
</tr>	<tr>
		<td>2017-06-21</td>
		<td>2017-06-30</td>
		<td>$0.1154</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-14.64%</td>
</tr>	<tr>
		<td>2017-05-23</td>
		<td>2017-06-01</td>
		<td>$0.1352</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>161.00%</td>
</tr>	<tr>
		<td>2017-04-21</td>
		<td>2017-05-02</td>
		<td>$0.0518</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-39.13%</td>
</tr>	<tr>
		<td>2017-03-22</td>
		<td>2017-03-31</td>
		<td>$0.0851</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-26.00%</td>
</tr>	<tr>
		<td>2017-02-24</td>
		<td>2017-03-07</td>
		<td>$0.115</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>52.93%</td>
</tr>	<tr>
		<td>2017-01-27</td>
		<td>2017-02-07</td>
		<td>$0.0752</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-4.69%</td>
</tr>	<tr>
		<td>2016-12-28</td>
		<td>2017-01-09</td>
		<td>$0.0789</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-29.43%</td>
</tr>	<tr>
		<td>2016-11-28</td>
		<td>2016-12-07</td>
		<td>$0.1118</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>61.56%</td>
</tr>	<tr>
		<td>2016-10-27</td>
		<td>2016-11-07</td>
		<td>$0.0692</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-18.87%</td>
</tr>	<tr>
		<td>2016-09-13</td>
		<td>2016-09-22</td>
		<td>$0.0853</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-32.89%</td>
</tr>	<tr>
		<td>2016-08-29</td>
		<td>2016-09-08</td>
		<td>$0.1271</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>87.46%</td>
</tr>	<tr>
		<td>2016-07-27</td>
		<td>2016-08-08</td>
		<td>$0.0678</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-20.33%</td>
</tr>	<tr>
		<td>2016-06-14</td>
		<td>2016-06-23</td>
		<td>$0.0851</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-29.38%</td>
</tr>	<tr>
		<td>2016-05-27</td>
		<td>2016-06-07</td>
		<td>$0.1205</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>63.72%</td>
</tr>	<tr>
		<td>2016-04-27</td>
		<td>2016-05-06</td>
		<td>$0.0736</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>21.25%</td>
</tr>	<tr>
		<td>2016-03-15</td>
		<td>2016-03-24</td>
		<td>$0.0607</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-52.20%</td>
</tr>	<tr>
		<td>2016-02-25</td>
		<td>2016-03-07</td>
		<td>$0.127</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>73.73%</td>
</tr>	<tr>
		<td>2016-01-27</td>
		<td>2016-02-05</td>
		<td>$0.0731</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-2.53%</td>
</tr>	<tr>
		<td>2015-12-24</td>
		<td>2016-01-04</td>
		<td>$0.075</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-40.00%</td>
</tr>	<tr>
		<td>2015-11-26</td>
		<td>2015-12-07</td>
		<td>$0.125</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>71.23%</td>
</tr>	<tr>
		<td>2015-10-28</td>
		<td>2015-11-09</td>
		<td>$0.073</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-7.59%</td>
</tr>	<tr>
		<td>2015-09-25</td>
		<td>2015-10-06</td>
		<td>$0.079</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-37.30%</td>
</tr>	<tr>
		<td>2015-08-27</td>
		<td>2015-09-07</td>
		<td>$0.126</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>55.56%</td>
</tr>	<tr>
		<td>2015-07-29</td>
		<td>2015-08-10</td>
		<td>$0.081</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>2.53%</td>
</tr>	<tr>
		<td>2015-06-26</td>
		<td>2015-07-07</td>
		<td>$0.079</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-42.34%</td>
</tr>	<tr>
		<td>2015-05-27</td>
		<td>2015-06-08</td>
		<td>$0.137</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>120.97%</td>
</tr>	<tr>
		<td>2015-04-28</td>
		<td>2015-05-08</td>
		<td>$0.062</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-28.74%</td>
</tr>	<tr>
		<td>2015-03-25</td>
		<td>2015-04-06</td>
		<td>$0.087</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-28.10%</td>
</tr>	<tr>
		<td>2015-02-25</td>
		<td>2015-03-09</td>
		<td>$0.121</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>65.75%</td>
</tr>	<tr>
		<td>2015-01-28</td>
		<td>2015-02-09</td>
		<td>$0.073</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-15.12%</td>
</tr>	<tr>
		<td>2014-12-24</td>
		<td>2015-01-05</td>
		<td>$0.086</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-21.10%</td>
</tr>	<tr>
		<td>2014-11-26</td>
		<td>2014-12-08</td>
		<td>$0.109</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>84.75%</td>
</tr>	<tr>
		<td>2014-10-29</td>
		<td>2014-11-10</td>
		<td>$0.059</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-28.05%</td>
</tr>	<tr>
		<td>2014-09-24</td>
		<td>2014-10-06</td>
		<td>$0.082</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-28.07%</td>
</tr>	<tr>
		<td>2014-08-27</td>
		<td>2014-09-08</td>
		<td>$0.114</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>78.13%</td>
</tr>	<tr>
		<td>2014-07-29</td>
		<td>2014-08-08</td>
		<td>$0.064</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-23.81%</td>
</tr>	<tr>
		<td>2014-06-24</td>
		<td>2014-07-04</td>
		<td>$0.084</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-26.32%</td>
</tr>	<tr>
		<td>2014-05-28</td>
		<td>2014-06-09</td>
		<td>$0.114</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>78.13%</td>
</tr>	<tr>
		<td>2014-04-28</td>
		<td>2014-05-09</td>
		<td>$0.064</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-15.79%</td>
</tr>	<tr>
		<td>2014-03-25</td>
		<td>2014-04-04</td>
		<td>$0.076</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-9.52%</td>
</tr>	<tr>
		<td>2014-02-26</td>
		<td>2014-03-10</td>
		<td>$0.084</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-4.55%</td>
</tr>	<tr>
		<td>2014-01-29</td>
		<td>2014-02-10</td>
		<td>$0.088</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>100.00%</td>
</tr>	<tr>
		<td>2013-12-27</td>
		<td>2014-01-07</td>
		<td>$0.044</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-45.68%</td>
</tr>	<tr>
		<td>2013-11-27</td>
		<td>2013-12-09</td>
		<td>$0.081</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-5.81%</td>
</tr>	<tr>
		<td>2013-10-29</td>
		<td>2013-11-08</td>
		<td>$0.086</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>82.98%</td>
</tr>	<tr>
		<td>2013-09-23</td>
		<td>2013-10-04</td>
		<td>$0.047</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-31.88%</td>
</tr>	<tr>
		<td>2013-08-28</td>
		<td>2013-09-09</td>
		<td>$0.069</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-23.33%</td>
</tr>	<tr>
		<td>2013-07-29</td>
		<td>2013-08-09</td>
		<td>$0.09</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>125.00%</td>
</tr>	<tr>
		<td>2013-06-24</td>
		<td>2013-07-05</td>
		<td>$0.04</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-52.38%</td>
</tr>	<tr>
		<td>2013-05-29</td>
		<td>2013-06-10</td>
		<td>$0.084</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>27.27%</td>
</tr>	<tr>
		<td>2013-04-26</td>
		<td>2013-05-07</td>
		<td>$0.066</td>
		<td><img src='/images/arrow_up.png' alt='dividend raise'/>112.90%</td>
</tr>	<tr>
		<td>2013-03-22</td>
		<td>2013-04-02</td>
		<td>$0.031</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-34.04%</td>
</tr>	<tr>
		<td>2013-02-26</td>
		<td>2013-03-08</td>
		<td>$0.047</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-30.88%</td>
</tr>	<tr>
		<td>2013-01-29</td>
		<td>2013-02-08</td>
		<td>$0.068</td>
		<td></td>
</tr>	<tr>
		<td>2012-12-27</td>
		<td>2013-01-07</td>
		<td>$0.002</td>
		<td><img src='/images/arrow_down.png' alt='dividend decrease'/>-33.33%</td>
</tr>	<tr>
		<td>2012-11-28</td>
		<td>2012-12-10</td>
		<td>$0.003</td>
		<td></td>
</tr></tbody></table>
			</div>
			

			<div class="col-md-2">
				<p>
					<!-- NEW -->
					<!-- dividend_history_responsive_right -->
					<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
					<ins class="adsbygoogle"
					     style="display:block"
					     data-ad-client="ca-pub-7749727118045578"
					     data-ad-slot="5310704540"
					     data-ad-format="rectangle"></ins>
					<script>
					(adsbygoogle = window.adsbygoogle || []).push({});
					</script>
					<br/>
				</p>
								<div class="hidden-xs hidden-sm">
					<table class="table top-search-table">
						<tr>
							<th>Top Searches (current)</th>
						</tr>
						<tr>
							<td><a href="http://dividendhistory.org/payout/GME/">GME GameStop</a></td>
						</tr>
						<tr>
							<td><a href="http://dividendhistory.org/payout/TSX/FTS">FTS Fortis</a></td>
						</tr>
						<tr>
							<td><a href="http://dividendhistory.org/payout/BBY/">BBY Best Buy</a></td>
						</tr>
						<tr>
							<td><a href="https://dividendhistory.org/payout/TSX/REI.UN/">REI.UN RioCan REIT</a></td>
						</tr>
						<tr>
							<td><a href="http://dividendhistory.org/payout/tsx/BNS/">BNS Bank of Nova Scotia</a></td>
						</tr>
						<tr>
							<td><a href="http://dividendhistory.org/payout/TSX/RCI.B/">RCI.B Rogers Communications</a></td>
						</tr>
						<tr>
							<td><a href="http://dividendhistory.org/payout/KO/">KO Coca-Cola Company</a></td>
						</tr>
					</table>

					<br/>

					<table class="table top-search-table">
						<tr>
							<th>Top Searches (2020)</th>
						</tr>
						<tr>
							<td><a href="https://dividendhistory.org/payout/TSX/REI.UN/">REI.UN RioCan REIT</a></td>
						</tr>
						<tr>
							<td><a href="http://dividendhistory.org/payout/AAPL/">AAPL Apple</a></td>
						</tr>
						<tr>
							<td><a href="http://dividendhistory.org/payout/TSX/ENB">ENB Enbridge</a></td>
						</tr>
						<tr>
							<td><a href="http://dividendhistory.org/payout/JNJ/">JNJ Johnson &amp; Johnson</a></td>
						</tr>
						<tr>
							<td><a href="http://dividendhistory.org/payout/TSX/TD">TD Toronto-Dominion Bank</a></td>
						</tr>
						<tr>
							<td><a href="http://dividendhistory.org/payout/T/">T AT&amp;T</a></td>
						</tr>
						<tr>
							<td><a href="http://dividendhistory.org/payout/TSX/BCE/">BCE BCE Inc</a></td>
						</tr>
					</table>
				</div>

			</div>
		</div>				<hr class="space"/>
		<p>2012<script>new Date().getFullYear()>2010&&document.write("-"+new Date().getFullYear());</script> DividendHistory.org, All Rights Reserved</p>	</div>
</body>


</html>
`;

export const result: DeepReadonly<DividendData> = {
  closePrice: '42.10',
  data: [
    {
      amount: 0.16198,
      changePct: 0,
      exDate: '2023-06-30',
      payDate: '2023-07-11',
    },
    {
      amount: 0.16198,
      changePct: 0,
      exDate: '2023-05-31',
      payDate: '2023-06-08',
    },
    {
      amount: 0.16198,
      changePct: 4.17,
      exDate: '2023-04-28',
      payDate: '2023-05-08',
    },
    {
      amount: 0.155496,
      changePct: -9.42,
      exDate: '2023-03-31',
      payDate: '2023-04-10',
    },
    {
      amount: 0.171674,
      changePct: 1.36,
      exDate: '2023-02-28',
      payDate: '2023-03-08',
    },
    {
      amount: 0.169373,
      changePct: 14.46,
      exDate: '2023-01-31',
      payDate: '2023-02-08',
    },
    {
      amount: 0.147973,
      changePct: -21.5,
      exDate: '2022-12-29',
      payDate: '2023-01-09',
    },
    {
      amount: 1.5034284,
      changePct: NaN,
      exDate: '2022-12-29',
      payDate: '2023-01-09',
    },
    {
      amount: 0.18849,
      changePct: 59.58,
      exDate: '2022-11-30',
      payDate: '2022-12-08',
    },
    {
      amount: 0.118113,
      changePct: -42.91,
      exDate: '2022-10-31',
      payDate: '2022-11-08',
    },
    {
      amount: 0.206904,
      changePct: 18.31,
      exDate: '2022-09-30',
      payDate: '2022-10-11',
    },
    {
      amount: 0.174877,
      changePct: 38.69,
      exDate: '2022-08-31',
      payDate: '2022-09-09',
    },
    {
      amount: 0.126094,
      changePct: -19.7,
      exDate: '2022-07-29',
      payDate: '2022-08-09',
    },
    {
      amount: 0.157027,
      changePct: 11.89,
      exDate: '2022-06-30',
      payDate: '2022-07-11',
    },
    {
      amount: 0.140337,
      changePct: 22.02,
      exDate: '2022-05-31',
      payDate: '2022-06-08',
    },
    {
      amount: 0.11501,
      changePct: -25.8,
      exDate: '2022-04-29',
      payDate: '2022-05-09',
    },
    {
      amount: 0.155,
      changePct: 0,
      exDate: '2022-03-31',
      payDate: '2022-04-08',
    },
    {
      amount: 0.155,
      changePct: 13.14,
      exDate: '2022-02-28',
      payDate: '2022-03-08',
    },
    {
      amount: 0.137,
      changePct: 12.3,
      exDate: '2022-01-31',
      payDate: '2022-02-08',
    },
    {
      amount: 0.122,
      changePct: -13.48,
      exDate: '2021-12-30',
      payDate: '2022-01-10',
    },
    {
      amount: 0.158938,
      changePct: NaN,
      exDate: '2021-12-30',
      payDate: '2022-01-10',
    },
    {
      amount: 0.141,
      changePct: 50,
      exDate: '2021-11-30',
      payDate: '2021-12-08',
    },
    {
      amount: 0.094,
      changePct: -38.56,
      exDate: '2021-10-29',
      payDate: '2021-11-08',
    },
    {
      amount: 0.153,
      changePct: 5.52,
      exDate: '2021-09-29',
      payDate: '2021-10-08',
    },
    {
      amount: 0.145,
      changePct: 62.92,
      exDate: '2021-08-31',
      payDate: '2021-09-09',
    },
    {
      amount: 0.089,
      changePct: -42.21,
      exDate: '2021-07-30',
      payDate: '2021-08-10',
    },
    {
      amount: 0.154,
      changePct: 10.79,
      exDate: '2021-06-30',
      payDate: '2021-07-09',
    },
    {
      amount: 0.139,
      changePct: 54.44,
      exDate: '2021-05-28',
      payDate: '2021-06-07',
    },
    {
      amount: 0.09,
      changePct: -39.19,
      exDate: '2021-04-30',
      payDate: '2021-05-10',
    },
    {
      amount: 0.148,
      changePct: -8.64,
      exDate: '2021-03-31',
      payDate: '2021-04-09',
    },
    {
      amount: 0.162,
      changePct: 54.29,
      exDate: '2021-02-26',
      payDate: '2021-03-08',
    },
    {
      amount: 0.105,
      changePct: -6.42,
      exDate: '2021-01-29',
      payDate: '2021-02-08',
    },
    {
      amount: 0.1122,
      changePct: -28.17,
      exDate: '2020-12-30',
      payDate: '2021-01-08',
    },
    {
      amount: 0.1562,
      changePct: 84.2,
      exDate: '2020-11-30',
      payDate: '2020-12-08',
    },
    {
      amount: 0.0848,
      changePct: -35.27,
      exDate: '2020-10-30',
      payDate: '2020-11-09',
    },
    {
      amount: 0.131,
      changePct: -13.4,
      exDate: '2020-09-30',
      payDate: '2020-10-08',
    },
    {
      amount: 0.151274,
      changePct: 48.75,
      exDate: '2020-08-31',
      payDate: '2020-09-09',
    },
    {
      amount: 0.101699,
      changePct: -23.65,
      exDate: '2020-07-31',
      payDate: '2020-08-11',
    },
    {
      amount: 0.133207,
      changePct: -26.2,
      exDate: '2020-06-22',
      payDate: '2020-06-30',
    },
    {
      amount: 0.180497,
      changePct: 110.61,
      exDate: '2020-05-29',
      payDate: '2020-06-08',
    },
    {
      amount: 0.0857,
      changePct: -27.5,
      exDate: '2020-04-30',
      payDate: '2020-05-08',
    },
    {
      amount: 0.1182,
      changePct: -26.26,
      exDate: '2020-03-31',
      payDate: '2020-04-08',
    },
    {
      amount: 0.1603,
      changePct: 80.72,
      exDate: '2020-02-28',
      payDate: '2020-03-09',
    },
    {
      amount: 0.0887,
      changePct: -29.94,
      exDate: '2020-01-31',
      payDate: '2020-02-10',
    },
    {
      amount: 0.1266,
      changePct: -19.36,
      exDate: '2019-12-30',
      payDate: '2020-01-08',
    },
    {
      amount: 0.157,
      changePct: 190.74,
      exDate: '2019-11-29',
      payDate: '2019-12-09',
    },
    {
      amount: 0.054,
      changePct: -50,
      exDate: '2019-10-31',
      payDate: '2019-11-11',
    },
    {
      amount: 0.108,
      changePct: -47.06,
      exDate: '2019-09-30',
      payDate: '2019-10-08',
    },
    {
      amount: 0.204,
      changePct: 0,
      exDate: '2019-08-30',
      payDate: '2019-09-10',
    },
    {
      amount: 0.0532,
      changePct: -66.11,
      exDate: '2019-07-31',
      payDate: '2019-08-09',
    },
    {
      amount: 0.157,
      changePct: -20.91,
      exDate: '2019-06-28',
      payDate: '2019-07-09',
    },
    {
      amount: 0.1985,
      changePct: 0,
      exDate: '2019-05-31',
      payDate: '2019-06-10',
    },
    {
      amount: 0.05,
      changePct: -67.11,
      exDate: '2019-04-30',
      payDate: '2019-05-08',
    },
    {
      amount: 0.152,
      changePct: 9.35,
      exDate: '2019-03-29',
      payDate: '2019-04-08',
    },
    {
      amount: 0.139,
      changePct: 69.51,
      exDate: '2019-02-28',
      payDate: '2019-03-08',
    },
    {
      amount: 0.082,
      changePct: 15.98,
      exDate: '2019-01-30',
      payDate: '2019-02-07',
    },
    {
      amount: 0.0707,
      changePct: -62.31,
      exDate: '2018-12-28',
      payDate: '2019-01-08',
    },
    {
      amount: 0.1876,
      changePct: 0,
      exDate: '2018-11-30',
      payDate: '2018-12-10',
    },
    {
      amount: 0.0513,
      changePct: -51.19,
      exDate: '2018-10-31',
      payDate: '2018-11-07',
    },
    {
      amount: 0.1051,
      changePct: -44.1,
      exDate: '2018-09-28',
      payDate: '2018-10-09',
    },
    {
      amount: 0.188,
      changePct: 0,
      exDate: '2018-08-31',
      payDate: '2018-09-11',
    },
    {
      amount: 0.0525,
      changePct: -44.39,
      exDate: '2018-07-31',
      payDate: '2018-08-09',
    },
    {
      amount: 0.0944,
      changePct: -50.08,
      exDate: '2018-06-29',
      payDate: '2018-07-11',
    },
    {
      amount: 0.1891,
      changePct: 0,
      exDate: '2018-05-31',
      payDate: '2018-06-08',
    },
    {
      amount: 0.0552,
      changePct: -60.26,
      exDate: '2018-04-30',
      payDate: '2018-05-08',
    },
    {
      amount: 0.1389,
      changePct: 9.2,
      exDate: '2018-03-29',
      payDate: '2018-04-09',
    },
    {
      amount: 0.1272,
      changePct: 80.43,
      exDate: '2018-02-26',
      payDate: '2018-03-06',
    },
    {
      amount: 0.0705,
      changePct: -38.86,
      exDate: '2018-01-29',
      payDate: '2018-02-06',
    },
    {
      amount: 0.1153,
      changePct: -17.64,
      exDate: '2017-12-28',
      payDate: '2018-01-08',
    },
    {
      amount: 0.14,
      changePct: 164.15,
      exDate: '2017-11-27',
      payDate: '2017-12-08',
    },
    {
      amount: 0.053,
      changePct: -52.25,
      exDate: '2017-10-20',
      payDate: '2017-10-30',
    },
    {
      amount: 0.111,
      changePct: -22.81,
      exDate: '2017-09-20',
      payDate: '2017-09-28',
    },
    {
      amount: 0.1438,
      changePct: 0,
      exDate: '2017-08-22',
      payDate: '2017-08-31',
    },
    {
      amount: 0.047,
      changePct: -59.27,
      exDate: '2017-07-21',
      payDate: '2017-08-01',
    },
    {
      amount: 0.1154,
      changePct: -14.64,
      exDate: '2017-06-21',
      payDate: '2017-06-30',
    },
    {
      amount: 0.1352,
      changePct: 161,
      exDate: '2017-05-23',
      payDate: '2017-06-01',
    },
    {
      amount: 0.0518,
      changePct: -39.13,
      exDate: '2017-04-21',
      payDate: '2017-05-02',
    },
    {
      amount: 0.0851,
      changePct: -26,
      exDate: '2017-03-22',
      payDate: '2017-03-31',
    },
    {
      amount: 0.115,
      changePct: 52.93,
      exDate: '2017-02-24',
      payDate: '2017-03-07',
    },
    {
      amount: 0.0752,
      changePct: -4.69,
      exDate: '2017-01-27',
      payDate: '2017-02-07',
    },
    {
      amount: 0.0789,
      changePct: -29.43,
      exDate: '2016-12-28',
      payDate: '2017-01-09',
    },
    {
      amount: 0.1118,
      changePct: 61.56,
      exDate: '2016-11-28',
      payDate: '2016-12-07',
    },
    {
      amount: 0.0692,
      changePct: -18.87,
      exDate: '2016-10-27',
      payDate: '2016-11-07',
    },
    {
      amount: 0.0853,
      changePct: -32.89,
      exDate: '2016-09-13',
      payDate: '2016-09-22',
    },
    {
      amount: 0.1271,
      changePct: 87.46,
      exDate: '2016-08-29',
      payDate: '2016-09-08',
    },
    {
      amount: 0.0678,
      changePct: -20.33,
      exDate: '2016-07-27',
      payDate: '2016-08-08',
    },
    {
      amount: 0.0851,
      changePct: -29.38,
      exDate: '2016-06-14',
      payDate: '2016-06-23',
    },
    {
      amount: 0.1205,
      changePct: 63.72,
      exDate: '2016-05-27',
      payDate: '2016-06-07',
    },
    {
      amount: 0.0736,
      changePct: 21.25,
      exDate: '2016-04-27',
      payDate: '2016-05-06',
    },
    {
      amount: 0.0607,
      changePct: -52.2,
      exDate: '2016-03-15',
      payDate: '2016-03-24',
    },
    {
      amount: 0.127,
      changePct: 73.73,
      exDate: '2016-02-25',
      payDate: '2016-03-07',
    },
    {
      amount: 0.0731,
      changePct: -2.53,
      exDate: '2016-01-27',
      payDate: '2016-02-05',
    },
    {
      amount: 0.075,
      changePct: -40,
      exDate: '2015-12-24',
      payDate: '2016-01-04',
    },
    {
      amount: 0.125,
      changePct: 71.23,
      exDate: '2015-11-26',
      payDate: '2015-12-07',
    },
    {
      amount: 0.073,
      changePct: -7.59,
      exDate: '2015-10-28',
      payDate: '2015-11-09',
    },
    {
      amount: 0.079,
      changePct: -37.3,
      exDate: '2015-09-25',
      payDate: '2015-10-06',
    },
    {
      amount: 0.126,
      changePct: 55.56,
      exDate: '2015-08-27',
      payDate: '2015-09-07',
    },
    {
      amount: 0.081,
      changePct: 2.53,
      exDate: '2015-07-29',
      payDate: '2015-08-10',
    },
    {
      amount: 0.079,
      changePct: -42.34,
      exDate: '2015-06-26',
      payDate: '2015-07-07',
    },
    {
      amount: 0.137,
      changePct: 120.97,
      exDate: '2015-05-27',
      payDate: '2015-06-08',
    },
    {
      amount: 0.062,
      changePct: -28.74,
      exDate: '2015-04-28',
      payDate: '2015-05-08',
    },
    {
      amount: 0.087,
      changePct: -28.1,
      exDate: '2015-03-25',
      payDate: '2015-04-06',
    },
    {
      amount: 0.121,
      changePct: 65.75,
      exDate: '2015-02-25',
      payDate: '2015-03-09',
    },
    {
      amount: 0.073,
      changePct: -15.12,
      exDate: '2015-01-28',
      payDate: '2015-02-09',
    },
    {
      amount: 0.086,
      changePct: -21.1,
      exDate: '2014-12-24',
      payDate: '2015-01-05',
    },
    {
      amount: 0.109,
      changePct: 84.75,
      exDate: '2014-11-26',
      payDate: '2014-12-08',
    },
    {
      amount: 0.059,
      changePct: -28.05,
      exDate: '2014-10-29',
      payDate: '2014-11-10',
    },
    {
      amount: 0.082,
      changePct: -28.07,
      exDate: '2014-09-24',
      payDate: '2014-10-06',
    },
    {
      amount: 0.114,
      changePct: 78.13,
      exDate: '2014-08-27',
      payDate: '2014-09-08',
    },
    {
      amount: 0.064,
      changePct: -23.81,
      exDate: '2014-07-29',
      payDate: '2014-08-08',
    },
    {
      amount: 0.084,
      changePct: -26.32,
      exDate: '2014-06-24',
      payDate: '2014-07-04',
    },
    {
      amount: 0.114,
      changePct: 78.13,
      exDate: '2014-05-28',
      payDate: '2014-06-09',
    },
    {
      amount: 0.064,
      changePct: -15.79,
      exDate: '2014-04-28',
      payDate: '2014-05-09',
    },
    {
      amount: 0.076,
      changePct: -9.52,
      exDate: '2014-03-25',
      payDate: '2014-04-04',
    },
    {
      amount: 0.084,
      changePct: -4.55,
      exDate: '2014-02-26',
      payDate: '2014-03-10',
    },
    {
      amount: 0.088,
      changePct: 100,
      exDate: '2014-01-29',
      payDate: '2014-02-10',
    },
    {
      amount: 0.044,
      changePct: -45.68,
      exDate: '2013-12-27',
      payDate: '2014-01-07',
    },
    {
      amount: 0.081,
      changePct: -5.81,
      exDate: '2013-11-27',
      payDate: '2013-12-09',
    },
    {
      amount: 0.086,
      changePct: 82.98,
      exDate: '2013-10-29',
      payDate: '2013-11-08',
    },
    {
      amount: 0.047,
      changePct: -31.88,
      exDate: '2013-09-23',
      payDate: '2013-10-04',
    },
    {
      amount: 0.069,
      changePct: -23.33,
      exDate: '2013-08-28',
      payDate: '2013-09-09',
    },
    {
      amount: 0.09,
      changePct: 125,
      exDate: '2013-07-29',
      payDate: '2013-08-09',
    },
    {
      amount: 0.04,
      changePct: -52.38,
      exDate: '2013-06-24',
      payDate: '2013-07-05',
    },
    {
      amount: 0.084,
      changePct: 27.27,
      exDate: '2013-05-29',
      payDate: '2013-06-10',
    },
    {
      amount: 0.066,
      changePct: 112.9,
      exDate: '2013-04-26',
      payDate: '2013-05-07',
    },
    {
      amount: 0.031,
      changePct: -34.04,
      exDate: '2013-03-22',
      payDate: '2013-04-02',
    },
    {
      amount: 0.047,
      changePct: -30.88,
      exDate: '2013-02-26',
      payDate: '2013-03-08',
    },
    {
      amount: 0.068,
      changePct: 0,
      exDate: '2013-01-29',
      payDate: '2013-02-08',
    },
    {
      amount: 0.002,
      changePct: -33.33,
      exDate: '2012-12-27',
      payDate: '2013-01-07',
    },
    {
      amount: 0.003,
      changePct: 0,
      exDate: '2012-11-28',
      payDate: '2012-12-10',
    },
  ],
  divYieldPct: '4.56',
  frequency: 'Monthly',
  name: 'Vanguard FTSE Canadian High Dividend Yield Index',
  peRatio: '11.2',
} as const;
