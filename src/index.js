import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";

function isConsole(expression) {
  return t.isCallExpression(expression) && expression.callee.object.name === "console";
}

function consoleLog(...args) {
  const _callee = t.memberExpression(
    t.identifier("console"),
    t.identifier("log")
  );
  return t.callExpression(_callee, [...args]);
}

export default declare((api) => {
  api.assertVersion(7);

  return {
    name: "auto-console",
    visitor: {
      ExpressionStatement(path) {
        if (isConsole(path.node.expression)) {
          return;
        }
        const expression = path.node.expression.__clone();
        path.node.expression = consoleLog(expression);
      },
    },
  };
});
