export class dateHelpers {
   

    diffActiveAndToday(date) {
        let parts = date.split('/')
        let mydate = new Date(parts[2], parts[1] - 1, parts[0])
        let today = new Date(Date.now())
        let count = Math.floor((today - mydate) / (1000 * 3600 * 24))

        cy.log('Activated Date: ' + mydate.toDateString())
        cy.log('Today: ' + today.toDateString())
        cy.log('Days: ' + count)

        return count
    }

    getDateBeforeToday = (days) => {
        let date = new Date()
        date.setDate(date.getDate() - days)
        return date.toISOString().substr(0, 10).split('-').reverse().join('/')
    }
    
    static getTodayStr = (data) => {
        return ("0" + data.getDate()).substr(-2) + "/" + ("0" + (data.getMonth() + 1)).substr(-2) + "/" + data.getFullYear();
    }

    static getTodayInvertedStr = (data) => {
        return data.getFullYear() + "-" + ("0" + (data.getMonth() + 1)).substr(-2) + "-" +("0" + data.getDate()).substr(-2) ;
    }

    static getDateNowFormated = () => {
        let date = new Date()
        return (date.getFullYear() + "-" + ((date.getMonth() + 1)) + "-" + (date.getDate() ))  ;
    }

    static getHoursNowFormated = () => {
        let date = new Date()
        return ('0' + date.getHours()).slice(-2) + ":" +  ('0' + date.getMinutes()).slice(-2)+ ":" +  ('0' + date.getSeconds()).slice(-2);

    }

    static getNowNative = () => {
        let date = new Date()
        return ("D" + (date.getDate()) + "-" +  ("0" + (date.getMonth() + 1)) + "-" + date.getFullYear() + (' T') + ('0' + date.getHours()).slice(-2) + ":" +  ('0' + date.getMinutes()).slice(-2)+ ":" +  ('0' + date.getSeconds()).slice(-2))
    }

}