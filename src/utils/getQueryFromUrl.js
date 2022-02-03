import queryString from 'query-string';

export default function getQueryFromUrl(string) {
    return queryString.parse(string);
}
