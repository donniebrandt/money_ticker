(function($) {
    $.fn.money_ticker = function(options)
    {
        // System-wide defaults
        var settings = $.extend({
            baseRate: 0,
            baseDate: new Date(),
            rateIncrement: 1,
            updateInterval: 1000,
            currencySymbol: '$',
        }, options);

        function getDateDiff(currentDate, baseDate) {
            return parseInt((currentDate.getTime() - baseDate.getTime()) / 1000);
        }

        function getCurrentRate(baseRate, dateDifference, rateIncrement) {
            return baseRate + (dateDifference * rateIncrement);
        }
        
        function updateRate(currentRate, rateIncrement) {
            return currentRate + rateIncrement;
        }
        
        Number.prototype.formatMoney = function(decPlaces, thouSeparator, decSeparator) {
            var n             = this;
            var decPlaces     = isNaN(decPlaces = Math.abs(decPlaces))? 2: decPlaces;
            var decSeparator  = decSeparator == undefined? ".": decSeparator;
            var thouSeparator = thouSeparator == undefined? ",": thouSeparator;
            var sign          = n < 0? "-": "";
            var i             = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "";
            var j             = (j = i.length) > 3? j % 3: 0;

            return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
        }

        return this.each(function() {
            var elem           = $(this);
            var currentRate    = 0;
            var currentDate    = new Date();
            var dateDifference = 0;
            
            // Individual settings using HTML5 data attributes
            var config         = {
                baseRate: parseFloat(elem.data('baseRate')) || settings.baseRate,
                baseDate: new Date(elem.data('baseDate')) || settings.baseDate,
                rateIncrement: parseFloat(elem.data('rateIncrement')) || settings.rateIncrement,
                updateInterval: parseInt(elem.data('updateInterval')) || settings.updateInterval,
                currencySymbol: elem.data('currencySymbol') || settings.currencySymbol,
            }

            if (config.baseDate == 'Invalid Date') {
                config.baseDate = currentDate;
            }

            dateDifference = getDateDiff(currentDate, config.baseDate);
            currentRate    = getCurrentRate(config.baseRate, dateDifference, config.rateIncrement);

            setInterval(function() {
                currentRate = updateRate(currentRate, config.rateIncrement);
                console.log(currentRate);
                elem.text(config.currencySymbol + currentRate.formatMoney(2, ',', '.'));
            }, config.updateInterval);
        });
    };
})(jQuery);