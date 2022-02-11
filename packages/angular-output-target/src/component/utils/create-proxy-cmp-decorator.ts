import { ProxyCmpDecorator } from "../types";

/**
 * Creates the markup for the custom @ProxyCmp decorator implementation that
 * is attached to each generated Angular component class.
 */
export function createProxyCmpDecorator(decorator: ProxyCmpDecorator, options: {
  includeImportCustomElements: boolean;
  tagNamePascalCase?: string
}) {
  const { inputs } = decorator;
  let defineCustomElementFn;

  if (options.includeImportCustomElements) {
    if (!options.tagNamePascalCase) {
      throw Error('tagNamePascalCase is required when includeImportCustomElements is true');
    }
    defineCustomElementFn = `define${options.tagNamePascalCase}`;
  }
  return (
    `@ProxyCmp({
  defineCustomElementFn: ${defineCustomElementFn ?? 'undefined'},
  inputs: ${inputs && inputs.length > 0 ? `[${inputs.map(input => `'${input}'`).join(', ').trim()}]` : '[]'},
})`
  );
}
