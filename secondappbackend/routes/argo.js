const router = require('express').Router();
const axios = require('axios');
const passport = require('passport');
const endurl = require('../ksinfo.json').ARGO_API_URL;

// router.all('*', ensureAuthenticated);
router.all('/*', passport.authenticate('jwt', { session: false }));

router.get('/archived-workflows', async (req, res) => {
    /*let url =
        ('minStartedAt' in req.query) ?
            endurl + 'archived-workflows/?minStartedAt=' + encodeURIComponent(req.query.minStartedAt) : endurl + 'archived-workflows';
    if ('maxStartedAt' in req.query)
        url += '&maxStartedAt=' + encodeURIComponent(req.query.maxStartedAt);*/
    try {
        //const response = await axios.get(url, {
        const response = await axios.get(endurl + 'archived-workflows', {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        const items = response.data.items;
        if (items?.length > 0)
            res.send(response.data);
        else
            res.sendStatus(204);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.get('/archived-workflows/:uid', async (req, res) => {
    try {
        const response = await axios.get(endurl + 'archived-workflows/' + req.params.uid, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.delete('/archived-workflows/:uid', async (req, res) => {
    try {
        const response = await axios.delete(endurl + 'archived-workflows/' + req.params.uid, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.get('/cluster-workflow-templates', async (req, res) => {
    try {
        const response = await axios.get(endurl + 'cluster-workflow-templates', {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        const items = response.data.items;
        if (items?.length > 0)
            res.send(response.data);
        else
            res.sendStatus(204);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.post('/cluster-workflow-templates', async (req, res) => {
    try {
        const response = await axios.post(endurl + 'cluster-workflow-templates', req.body, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.post('/cluster-workflow-templates/lint', async (req, res) => {
    try {
        const response = await axios.post(endurl + 'cluster-workflow-templates/lint', req.body, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.get('/cluster-workflow-templates/:name', async (req, res) => {
    try {
        const response = await axios.get(endurl + 'cluster-workflow-templates/' + req.params.name, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.put('/cluster-workflow-templates/:name', async (req, res) => {
    try {
        const response = await axios.put(endurl + 'cluster-workflow-templates/' + req.params.name, req.body, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.delete('/cluster-workflow-templates/:name', async (req, res) => {
    try {
        const response = await axios.delete(endurl + 'cluster-workflow-templates/' + req.params.name, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.get('/cron-workflows', async (req, res) => {
    try {
        const response = await axios.get(endurl + 'cron-workflows/', {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        const items = response.data.items;
        if (items?.length > 0)
            res.send(response.data);
        else
            res.sendStatus(204);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.get('/cron-workflows/:namespace', async (req, res) => {
    try {
        const response = await axios.get(endurl + 'cron-workflows/' + req.params.namespace, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.post('/cron-workflows/:namespace', async (req, res) => {
    try {
        const response = await axios.post(endurl + 'cron-workflows/' + req.params.namespace, req.body, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.post('/cron-workflows/:namespace/lint', async (req, res) => {
    try {
        const response = await axios.post(endurl + 'cron-workflows/' + req.params.namespace + '/lint', req.body, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.get('/cron-workflows/:namespace/:name', async (req, res) => {
    try {
        const response = await axios.get(endurl + 'cron-workflows/' + req.params.namespace + '/' +
            req.params.name, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.put('/cron-workflows/:namespace/:name', async (req, res) => {
    try {
        const response = await axios.put(endurl + 'cron-workflows/' + req.params.namespace + '/' +
            req.params.name, req.body, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.delete('/cron-workflows/:namespace/:name', async (req, res) => {
    try {
        const response = await axios.delete(endurl + 'cron-workflows/' + req.params.namespace + '/' +
            req.params.name, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.put('/cron-workflows/:namespace/:name/resume', async (req, res) => {
    try {
        const response = await axios.put(endurl + 'cron-workflows/' + req.params.namespace + '/' +
            req.params.name + '/resume', req.body, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.put('/cron-workflows/:namespace/:name/suspend', async (req, res) => {
    try {
        const response = await axios.put(endurl + 'cron-workflows/' + req.params.namespace + '/' +
            req.params.name + '/suspend', req.body, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.post('/events/:namespace/:discriminator', async (req, res) => {
    try {
        const response = await axios.post(endurl + 'events/' + req.params.namespace + '/'
            + req.params.discriminator, req.body, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.get('/info', async (req, res) => {
    try {
        const response = await axios.get(endurl + 'info', {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
  
function secondsToTime(e){
    var forTime = e;
        
    var d = Math.floor(e / (3600*24)).toString(), 
    h = Math.floor((e - d*3600*24) / 3600).toString(),
    m = Math.floor(e % 3600 / 60).toString(),
    s = Math.floor(e % 60).toString();   

    if (d > 0)
        forTime = d+ 'd ' + h + 'h ' + m + 'm ' + s +'s';
    else if ( h> 0)
        forTime = h + 'h ' + m + 'm ' + s +'s';
    else if ( m > 0)
        forTime =  m + 'm ' + s +'s';
    else 
        forTime = e + 's';
        
    return forTime;
}

// refine the workflow-items for overview, metering
function refinedWfItem(item){
    var calledAt = new Date(); // set sametime 
    var wfItem = {};
    
    wfItem["uid"] = item.metadata.uid;
    wfItem["namespace"] = item.metadata.namespace;
    wfItem["name"] = item.metadata.name;
    wfItem["phase"] = item.status.phase;
    wfItem["finishedAt"] = item.status.finishedAt;
    wfItem["startedAt"] = item.status.startedAt;    

    if ( ['Error', 'Running'].includes(item.status.phase)) {            
        wfItem["progress"] = 'None';   
        wfItem["nodeDuration"] = 0;
        wfItem["nodeDurationFormatted"] = '0s';        
        wfItem["estimatedDuration"] = 0;
        wfItem["estimatedDurationFormatted"] = '0s';    
        wfItem["clusterName"] = 'None';            
        wfItem["resourceDurationCPU"] = 0;
        wfItem["resourceDurationMem"] = 0;
    }
    else {                
        wfItem["progress"] = item.status.progress;   
        node = item.status.nodes[item.metadata.name]; 
        var nodeStartedAt = new Date(node.startedAt);
        var nodeFinishedDate = (node.finishedAt != null)? new Date(node.finishedAt) : new Date(calledAt);                
        wfItem["nodeDuration"] = (nodeFinishedDate.getTime()- nodeStartedAt.getTime())/1000;         
        wfItem["nodeDurationFormatted"] = secondsToTime(wfItem["nodeDuration"]);        
        var startedDate = new Date(item.status.startedAt);        
        var finishedDate = item.status.finishedAt != null? new Date(item.status.finishedAt) : new Date(calledAt);                
        wfItem["estimatedDuration"] = (finishedDate.getTime()- startedDate.getTime())/1000;
        wfItem["estimatedDurationFormatted"] = secondsToTime(wfItem["estimatedDuration"]);
        wfItem["clusterName"] = (("spec" in item) && ("nodeSelector" in item.spec))? item.spec.nodeSelector.clusterName: 'default';                
        wfItem["resourceDurationCPU"] = ("resourcesDuration" in item.status) ? item.status.resourcesDuration.cpu : 0;
        wfItem["resourceDurationMem"] = ("resourcesDuration" in item.status) ? item.status.resourcesDuration.memory : 0;
    }

    return wfItem;
}

// call /argo/metering/{{namespace}}?minStartedAt=2020-11-13T15%3A00%3A00.000Z&maxStartedAt=2020-12-14T15%3A00%3A00.000Z
// cl_ex) /argo/metering/argo?minStartedAt=2020-11-13T15%3A00%3A00.000Z&maxStartedAt=2020-12-14T15%3A00%3A00.000Z
// api_ex)requestUrtl /api/v1/archived-workflows?listOptions.fieldSelector=metadata.namespace=argo,spec.startedAt%3E2020-11-13T15:00:00.000Z,spec.startedAt%3C2020-12-14T15:00:00.000ZmaxStartedAt

// cl_ex) /metering/?minStartedAt=2020-11-13T15%3A00%3A00.000Z&maxStartedAt=2020-12-14T15%3A00%3A00.000Z
// api_ex) /api/v1/archived-workflows?listOptions.fieldSelector=spec.startedAt%3E2020-11-13T15:00:00.000Z,spec.startedAt%3C2020-12-14T15:00:00.000Z
router.get('/metering', async (req, res) => {

    //get the workflows
    var tempWorkflows = [];
    const requestWfUrl = endurl + 'workflows/';    
    try {
        const response = await axios.get(endurl + 'workflows/', { headers: {Authorization: req.user.k8s_token}});
        if (response.data.items != null) {   
            for(var i = 0; i < response.data.items.length; i++){                
                item = refinedWfItem(response.data.items[i]);
                tempWorkflows.push(item) ;
            }            
        }        
    }
    catch (err) {
        res.status(400).send(err);
    }    

    //get archived-workflows      
    const requestAWfUrl = endurl + 'archived-workflows?listOptions.fieldSelector=spec.startedAt%3E' + req.query.minStartedAt 
                        + ',spec.startedAt%3C' + req.query.maxStartedAt;
    var tempArchivedWorkflows = [];

    try {
        const response = await axios.get(requestAWfUrl, { headers: { Authorization: req.user.k8s_token}});
        if (response.data.items != null) {  
            for ( var i = 0; i < response.data.items.length; i++) {
                var item = response.data.items[i];
                awfResponse = await axios.get(endurl + 'archived-workflows/' + item.metadata.uid, { headers: {Authorization: req.user.k8s_token}});                
                tempArchivedWorkflows.push(refinedWfItem(awfResponse.data));
            }                    
        }
    }
    catch (err) {
        res.status(400).send(err);
    }    
    // duplicate check
    function uniqueArray(array){
        var a = array.concat();
       for(var i=0; i<a.length; i++) {
           for(var j=i+1; j<a.length; j++) {
               if(a[i].uid === a[j].uid){
                   a.splice(j--, 1);
               }
           }
       }
       return a;
    }
    
    var concatData = uniqueArray(tempWorkflows.concat(tempArchivedWorkflows));
    var meteringData = [];
    for (var i = 0; i < concatData.length; i++){
        var temp = concatData[i];
        temp["price"]= concatData[i].resourceDurationCPU * 100;        
        meteringData.push(temp);
    }  
    res.send(meteringData);
});


// call /argo/metering/{{namespace}}?minStartedAt=2020-11-13T15%3A00%3A00.000Z&maxStartedAt=2020-12-14T15%3A00%3A00.000Z
// cl_ex) /argo/metering/argo?minStartedAt=2020-11-13T15%3A00%3A00.000Z&maxStartedAt=2020-12-14T15%3A00%3A00.000Z
// api_ex)requestUrtl /api/v1/archived-workflows?listOptions.fieldSelector=metadata.namespace=argo,spec.startedAt%3E2020-11-13T15:00:00.000Z,spec.startedAt%3C2020-12-14T15:00:00.000ZmaxStartedAt
router.get('/metering/:namespace', async (req, res) => {

    //get the workflows     
    var tempWorkflows = [];
    const requestWfUrl = endurl + 'workflows/' + req.params.namespace;    
    try {
        const response = await axios.get(endurl + 'workflows/' + req.params.namespace, { headers: {Authorization: req.user.k8s_token}});
        if (response.data.items != null) {               
        }  
            for(var i = 0; i < response.data.items.length; i++){                
                item = refinedWfItem(response.data.items[i]);
                tempWorkflows.push(item) ;
        }            
    }
    catch (err) {
        res.status(400).send(err);
    }    

    //get archived-workflows  
    //api/v1/archived-workflows/45ae4750-43bb-4105-a438-d9bde4ede2ef
    const requestAWfUrl = endurl + 'archived-workflows?listOptions.fieldSelector=metadata.namespace=' + req.params.namespace
                        + ',spec.startedAt%3E' + req.query.minStartedAt 
                        + ',spec.startedAt%3C' + req.query.maxStartedAt;    
    var tempArchivedWorkflows = [];

    try {
        const response = await axios.get(requestAWfUrl, { headers: { Authorization: req.user.k8s_token}});
        if (response.data.items != null) {                           
            for ( var i = 0; i < response.data.items.length; i++) {
                var item = response.data.items[i];

                awfResponse = await axios.get(endurl + 'archived-workflows/' + item.metadata.uid, { headers: {Authorization: req.user.k8s_token}});                
                tempArchivedWorkflows.push(refinedWfItem(awfResponse.data));
            }                    
        }
    }
    catch (err) {
        res.status(400).send(err);
    }    
    // duplicate check
    function uniqueArray(array){
        var a = array.concat();
       for(var i=0; i<a.length; i++) {
           for(var j=i+1; j<a.length; j++) {
               if(a[i].uid === a[j].uid){
                   a.splice(j--, 1);
               }
           }
       }
       return a;
    }
    
    var concatData = uniqueArray(tempWorkflows.concat(tempArchivedWorkflows));
    var meteringData = [];
    for (var i = 0; i < concatData.length; i++){
        var temp = concatData[i];
        temp["price"]= concatData[i].resourceDurationCPU * 100;        
        meteringData.push(temp);
    }  
    res.send(meteringData);
});

router.get('/overview-data', async (req, res) => {
    var overviewData = {};   
    try {
        const response = await axios.get(endurl + 'workflows/' + '?fields=items.metadata.uid', {            
            headers: {
                Authorization: req.user.k8s_token
            }
        });               
        overviewData["workflowsNum"] = response.data.items == null? 0: response.data.items.length;              
    }    
    catch (err) {
        res.status(400).send(err);
    }

    try {
        const response = await axios.get(endurl + 'workflow-templates/', {            
            headers: {
                Authorization: req.user.k8s_token
            }
        });   
        overviewData["workflowTemplatesNum"] = response.data.items == null? 0: response.data.items.length;  
    }    
    catch (err) {
        res.status(400).send(err);
    }

    try {
        const response = await axios.get(endurl + 'cluster-workflow-templates', {            
            headers: {
                Authorization: req.user.k8s_token
            }
        });  
        overviewData["clusterWorkflowTemplatesNum"] = response.data.items == null? 0: response.data.items.length;   
    }    
    catch (err) {
        res.status(400).send(err);
    }

    try {
        const response = await axios.get(endurl + 'cron-workflows/', {            
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        overviewData["cronWorkflowsNum"] = response.data.items == null? 0: response.data.items.length;    
    }    
    catch (err) {
        res.status(400).send(err);
    }
    res.send(overviewData);
    
});

router.get('/overview-data/:namespace', async (req, res) => {
    var overviewData = {};   

    try {
        //const response = await axios.get(endurl + 'workflows/' + req.params.namespace, {            
        const response = await axios.get(endurl + 'workflows/' + req.params.namespace + '?fields=items.metadata.uid', {            
            headers: {
                Authorization: req.user.k8s_token
            }
        });       
        overviewData["workflowsNum"] = response.data.items == null? 0: response.data.items.length;                     
    }    
    catch (err) {
        res.status(400).send(err);
    }

    try {
        const response = await axios.get(endurl + 'workflow-templates/' + req.params.namespace, {            
            headers: {
                Authorization: req.user.k8s_token
            }
        });        
        if (response.data.items == null)
        overviewData["workflowTemplatesNum"] = response.data.items == null? 0: response.data.items.length;                     
    }    
    catch (err) {
        res.status(400).send(err);
    }

    try {
        const response = await axios.get(endurl + 'cluster-workflow-templates', {            
            headers: {
                Authorization: req.user.k8s_token
            }
        });  
        overviewData["clusterWorkflowTemplatesNum"] = response.data.items == null? 0: response.data.items.length;           
    }    
    catch (err) {
        res.status(400).send(err);
    }

    try {
        const response = await axios.get(endurl + 'cron-workflows/' + req.params.namespace, {            
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        overviewData["cronWorkflowsNum"] = response.data.items == null? 0: response.data.items.length;            
    }    
    catch (err) {
        res.status(400).send(err);
    }
    res.json(overviewData);    
});

router.get('/overview-workflows', async (req, res) => {
    var overviewWorflows = {};  

    try {
        const response = await axios.get(endurl + 'workflows/', {  
            headers: {
                Authorization: req.user.k8s_token
            }
        });       

        if (response.data.items != null) { 
            var totalNodeDuration = 0;
            var totalEstimatedDuration = 0;
            var totalResourceDurationCPU = 0;
            var totalResourceDurationMem = 0;
            var workflows = [];
            
            for(var i = 0; i < response.data.items.length; i++){                
                item = refinedWfItem(response.data.items[i]);
                totalNodeDuration += item.nodeDuration;
                totalEstimatedDuration += item.estimatedDuration;
                totalResourceDurationCPU += item.resourceDurationCPU;
                totalResourceDurationMem += item.resourceDurationMem; 
                workflows.push(item) ;
            }
            overviewWorflows["totalNodeDuration"] = totalNodeDuration;
            overviewWorflows["totalEstimatedDuration"] = totalEstimatedDuration;
            overviewWorflows["totalResourceDurationCPU"] = totalResourceDurationCPU;
            overviewWorflows["totalResourceDurationMem"] = totalResourceDurationMem;
            overviewWorflows["workflows"] = workflows;   
        } 
        
    }
    catch (err) {
        res.status(400).send(err);
    }
    
    res.send(overviewWorflows);
    
});    

router.get('/overview-workflows/:namespace', async (req, res) => {
    var overviewWorflows = {};  

    try {
        const response = await axios.get(endurl + 'workflows/' + req.params.namespace, {            
            headers: {
                Authorization: req.user.k8s_token
            }
        });        

        if (response.data.items != null) { 
            var totalNodeDuration = 0;
            var totalEstimatedDuration = 0;
            var totalResourceDurationCPU = 0;
            var totalResourceDurationMem = 0;
            var workflows = [];
            
            for(var i = 0; i < response.data.items.length; i++){                
                item = refinedWfItem(response.data.items[i]);
                totalNodeDuration += item.nodeDuration;
                totalEstimatedDuration += item.estimatedDuration;
                totalResourceDurationCPU += item.resourceDurationCPU;
                totalResourceDurationMem += item.resourceDurationMem; 
                workflows.push(item) ;
            }
            overviewWorflows["totalNodeDuration"] = totalNodeDuration;
            overviewWorflows["totalEstimatedDuration"] = totalEstimatedDuration;
            overviewWorflows["totalResourceDurationCPU"] = totalResourceDurationCPU;
            overviewWorflows["totalResourceDurationMem"] = totalResourceDurationMem;
            overviewWorflows["workflows"] = workflows;   
        } 
        
    }
    catch (err) {
        res.status(400).send(err);
    }
    
    res.send(overviewWorflows);
    
});   


router.get('/userinfo', async (req, res) => {
    try {
        const response = await axios.get(endurl + 'userinfo', {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.get('/version', async (req, res) => {
    try {
        const response = await axios.get(endurl + 'version', {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.get('/stream/events/:namespace', async (req, res) => {
    try {
        const response = await axios.get(endurl + 'stream/events/' + req.params.namespace, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.get('/workflow-events', async (req, res) => {
    const requestUrl = Object.keys(req.query).length == 0 ? endurl + 'workflow-events/' : endurl + req.url;
    try {
        const response = await axios.get(requestUrl, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        const items = response.data.items;
        if (items?.length > 0)
            res.send(response.data);
        else
            res.sendStatus(204);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.get('/workflow-events/:namespace', async (req, res) => {
    const requestUrl =
        Object.keys(req.query).length == 0 ?
            endurl + 'workflow-events/' + req.params.namespace : endurl + req.url;
    try {
        const response = await axios.get(requestUrl, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.get('/workflows/:namespace', async (req, res) => {
    const requestUrl =
        Object.keys(req.query).length == 0 ?
            endurl + 'workflows/' + req.params.namespace : endurl + req.url;
    try {
        const response = await axios.get(requestUrl, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        const items = response.data.items;
        if (items?.length > 0)
            res.send(response.data);
        else
            res.sendStatus(204);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.get('/workflows', async (req, res) => {
    const requestUrl = Object.keys(req.query).length == 0 ? endurl + 'workflows/' : endurl + req.url;
    try {
        const response = await axios.get(requestUrl, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        const items = response.data.items;
        if (items?.length > 0)
            res.send(response.data);
        else
            res.sendStatus(204);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.post('/workflows/:namespace', async (req, res) => {
    try {
        const response = await axios.get(endurl + 'workflows/' + req.params.namespace, req.body, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send('created successfully');
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.post('/workflows/:namespace/lint', async (req, res) => {
    try {
        const response = await axios.get(endurl + 'workflows/' + req.params.namespace +'/lint',
            req.body, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.post('/workflows/:namespace/submit', async (req, res) => {
    try {
        const response = await axios.get(endurl + 'workflows/' + req.params.namespace + '/submit',
            req.body, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.get('/workflows/:namespace/:name', async (req, res) => {
    try {
        const response = await axios.get(endurl + 'workflows/'
            + req.params.namespace + '/' + req.params.name, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.delete('/workflows/:namespace/:name', async (req, res) => {
    try {
        const response = await axios.delete(endurl + 'workflows/'
            + req.params.namespace + '/' + req.params.name, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.get('/workflows/:namespace/:name/log', async (req, res) => {
    try {
        const response = await axios.get(endurl + 'workflows/'
            + req.params.namespace + '/' + req.params.name + '/log', {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.put('/workflows/:namespace/:name/resubmit', async (req, res) => {
    try {
        const response = await axios.put(endurl + 'workflows' + req.params.namespace + '/'
            + req.params.name + '/resubmit', req.body, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.put('/workflows/:namespace/:name/resume', async (req, res) => {
    try {
        const response = await axios.put(endurl + 'workflows' + req.params.namespace + '/'
            + req.params.name + '/resume', req.body, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.put('/workflows/:namespace/:name/retry', async (req, res) => {
    try {
        const response = await axios.put(endurl + 'workflows' + req.params.namespace + '/'
            + req.params.name + '/retry', req.body, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.put('/workflows/:namespace/:name/set', async (req, res) => {
    try {
        const response = await axios.put(endurl + 'workflows' + req.params.namespace + '/'
            + req.params.name + '/set', req.body, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.put('/workflows/:namespace/:name/stop', async (req, res) => {
    try {
        const response = await axios.put(endurl + 'workflows' + req.params.namespace + '/'
            + req.params.name + '/stop', req.body, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.put('/workflows/:namespace/:name/suspend', async (req, res) => {
    try {
        const response = await axios.put(endurl + 'workflows' + req.params.namespace + '/'
            + req.params.name + '/suspend', req.body, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.put('/workflows/:namespace/:name/terminate', async (req, res) => {
    try {
        const response = await axios.put(endurl + 'workflows' + req.params.namespace + '/'
            + req.params.name + '/terminate', req.body, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.get('/workflows/:namespace/:name/:podname/log', async (req, res) => {
    try {
        const response = await axios.get(endurl + 'workflows/'
            + req.params.namespace + '/' + req.params.name + '/' + req.params.podname + '/log', {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.get('/workflow-templates', async (req, res) => {
    try {
        const response = await axios.get(endurl + 'workflow-templates/', {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.get('/workflow-templates/:namespace', async (req, res) => {
    try {
        const response = await axios.get(endurl + 'workflow-templates/' + req.params.namespace, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.post('/workflow-templates/:namespace', async (req, res) => {
    try {
        const response = await axios.post(endurl + 'workflow-templates/' + req.params.namespace,
            req.body, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send('created successfully');
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.post('/workflow-templates/:namespace/lint', async (req, res) => {
    try {
        const response = await axios.post(endurl + 'workflow-templates/'
            + req.params.namespace + '/lint', req.body, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send('created successfully');
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.get('/workflow-templates/:namespace/:name', async (req, res) => {
    try {
        const response = await axios.get(endurl + 'workflow-templates/'
            + req.params.namespace + '/' + req.params.name, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.put('/workflow-templates/:namespace/:name', async (req, res) => {
    try {
        const response = await axios.put(endurl + 'workflow-templates/'
            + req.params.namespace + '/'+req.params.name, req.body, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.delete('/workflow-templates/:namespace/:name', async (req, res) => {
    try {
        const response = await axios.delete(endurl + 'workflow-templates/'
            + req.params.namespace + '/' + req.params.name, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.get('/metering', async (req, res) => {

    //get the workflows
    try {
        const response = await axios.get(endurl + 'workflows/', { headers: { Authorization: req.user.k8s_token } });
        if (!('items' in response.data))
            throw new Error('no items in response');
        const items = response.data.items;
        let tempWorkflows = [];
        if (items.length > 0)
            items.forEach(elem => tempWorkflows.push(elem));

        //get archived-workflows      
        const requestAWfUrl = endurl + 'archived-workflows?listOptions.fieldSelector=spec.startedAt%3E' + req.query.minStartedAt
            + ',spec.startedAt%3C' + req.query.maxStartedAt;

        const wfResponse = await axios.get(requestAWfUrl, { headers: { Authorization: req.user.k8s_token } });
        if (!('items' in wfResponse.data))
            throw new Error('no items in response');
        const wfs = response.data.items;
        let tempArchivedWorkflows = [];
        if (wfs.length > 0)
            wfs.forEach(async elem => {
                const awfResponse = await axios.get(endurl + 'archived-workflows/' + item.metadata.uid, { headers: { Authorization: req.user.k8s_token } });
                tempArchivedWorkflows.push(refinedWfItem(awfResponse.data));
            });
        const concatData = uniqueArray(tempWorkflows.concat(tempArchivedWorkflows));
        const meteringData = concat.map(elem => { return { price: elem.resourceDurationCPU * 100 } });
        res.send(meteringData);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        if (('tokenId' in req.user) && ('tokenId2' in req.user) && ('k8s_token' in req.user))
            next();
        else {
            console.error('authenticated but some tokens are missing');
            res.sendStatus(500);
        }
    }
    else res.sendStatus(401);
}

// refine the workflow-items for overview, metering
function refinedWfItem(item) {
    if (!('metadata' in item) || !('status' in item)) {
        console.error('invalid item data');
        return;
    }
    const calledAt = new Date(); // set sametime
    const metadata = item.metadata;
    const status = item.status;
    let wfItem = {
        uid: metadata.uid,
        namespace: metedata.namespace,
        phase: status.phase,
        finishedAt: status.finishedAt,
        startedAt: status.startedAt
    };

    if (['Error', 'Running'].includes(status.phase)) {
        wfItem.progress = 'None';
        wfItem.nodeDuration = 0;
        wfItem.nodeDurationFormatted = '0s';
        wfItem.estimatedDuration = 0;
        wfItem.estimatedDurationFormatted = '0s';
        wfItem.clusterName = 'None';
        wfItem.resourceDurationCPU = 0;
        wfItem.resourceDurationMem = 0;
    }
    else {
        wfItem.progress = status.progress;
        node = status.nodes[metadata.name];
        if (!('startedAt' in node)) {
            console.error('no start time in node');
            return;
        }
        const nodeStartedAt = new Date(node.startedAt);
        const nodeFinishedDate = !node.finishedAt ? calledAt : new Date(node.finishedAt);
        wfItem.nodeDuration = (nodeFinishedDate.getTime() - nodeStartedAt.getTime()) / 1000;
        wfItem.nodeDurationFormatted = secondsToTime(wfItem.nodeDuration);
        const startedDate = new Date(status.startedAt);
        const finishedDate = !item.status.finishedAt ? calledAt : new Date(status.finishedAt);
        wfItem.estimatedDuration = (finishedDate.getTime() - startedDate.getTime()) / 1000;
        wfItem.estimatedDurationFormatted = secondsToTime(wfItem["estimatedDuration"]);
        wfItem.clusterName = (("spec" in item) && ("nodeSelector" in item.spec)) ? item.spec.nodeSelector.clusterName : 'default';
        wfItem.resourceDurationCPU = ("resourcesDuration" in status) ? status.resourcesDuration.cpu : 0;
        wfItem.resourceDurationMem = ("resourcesDuration" in status) ? status.resourcesDuration.memory : 0;
    }

    return wfItem;
}

function secondsToTime(e) {
    let forTime = e;

    const d = Math.floor(e / (3600 * 24)).toString(),
        h = Math.floor((e - d * 3600 * 24) / 3600).toString(),
        m = Math.floor(e % 3600 / 60).toString(),
        s = Math.floor(e % 60).toString();

    if (d > 0)
        forTime = d + 'd ' + h + 'h ' + m + 'm ' + s + 's';
    else if (h > 0)
        forTime = h + 'h ' + m + 'm ' + s + 's';
    else if (m > 0)
        forTime = m + 'm ' + s + 's';
    else
        forTime = e + 's';

    return forTime;
}

// duplicate check
function uniqueArray(array) {
    let a = array.concat();
    for (let i = 0; i < a.length; i++)
        for (let j = i + 1; j < a.length; j++)
            if (a[i].uid === a[j].uid)
                a.splice(j--, 1);
    return a;
}


module.exports = router;