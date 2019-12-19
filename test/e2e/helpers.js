/* eslint import/prefer-default-export: off */
import { ClientFunction, Selector } from 'testcafe';

export const getPageUrl = ClientFunction(() => window.location.href);

export const clickLinkWithTitle = title => t =>
  t.click(Selector('a').withExactText(title));
