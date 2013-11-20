var sinon = require('sinon'),
    child_process = require('child_process'),
    helpers = require('../../lib/helpers'),
    stubExec;

module.exports = {
    tearDown: function(done) {
        //restore child_process.exec if any of testcases changed it
        if (stubExec) {
            stubExec.restore();
            stubExec = null;
        }
        done();
    },
    exec_opts: function(test) {
        var opts = {maxBuffer: 999999 * 1024};
        stubExec = sinon.stub(child_process, 'exec', function(command, optExecOptions) {
            test.strictEqual(command, "dummy_command");
            test.strictEqual(optExecOptions, opts);
        });
        test.expect(2);
        helpers.executeCommand("dummy_command", function(){}, true, opts);
        test.done();
    }
};