import Handlebars from 'handlebars';
import fs from 'fs';

interface ITemplateVariable {
  [Key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

export default class handlebarsMailTamplete {
  public async parse({ file, variables }: IParseMailTemplate): Promise<string> {
    const TemplateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const parseTemplate = Handlebars.compile(TemplateFileContent);

    return parseTemplate(variables);
  }
}
